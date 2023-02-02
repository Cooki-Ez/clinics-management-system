var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const session = require('express-session');
const authUtils = require('./util/authUtils');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
    res.locals.fmt=fmt;
    next();
});

app.use(session({
    secret: 'my_secret_password',
    resave: false
}));



app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    const admin = req.session.admin;
    res.locals.admin = admin;
    if (!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
})

app.use(cookieParser('secret'));
const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'], // languages available in the application. Create a separate dictionary for each of them
    directory: path.join(__dirname, 'locales'), // path to the directory where the dictionaries are located
    objectNotation: true, // enables the use of nested keys in object notation
    cookie: 'acme-hr-lang', //the name of the cookie that our application will use to store information about the language currently selected by the user
});
app.use(i18n.init); //initialization and connection to the application context

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['acme-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

const projectRouter = require('./routes/projectRoute')
const doctorRouter = require('./routes/doctorRoute');
const patientRouter = require('./routes/patientRoute');
const registrationRouter = require('./routes/registrationRoute')
const appointmentRouter = require('./routes/appointmentRoute');
const docApiRouter = require('./routes/api/DoctorApiRoute');
const patApiRouter = require('./routes/api/PatientApiRoute');
const appApiRouter = require('./routes/api/AppointmentApiRoute');
const fmt = require('./public/js/dateFormatting');

var indexRouter = require('./routes/index');


//logged in
app.use('/patients', authUtils.permitAuthenticatedUser, patientRouter);
app.use('/appointments', authUtils.permitAuthenticatedUser, appointmentRouter);

app.use('/patients/edit', authUtils.permitAuthenticatedUser, patientRouter);
app.use('/patients/details', authUtils.permitAuthenticatedUser, patientRouter);

app.use('/appointments/details', authUtils.permitAuthenticatedUser, appointmentRouter);



//admin
app.use('/doctors/details', authUtils.permitAuthenticatedUser, doctorRouter);
app.use('/doctors/edit', authUtils.permitOnlyForAdmin, doctorRouter);
app.use('/doctors/delete', authUtils.permitOnlyForAdmin, doctorRouter);

app.use('/appointments/edit', authUtils.permitOnlyForAdmin, appointmentRouter);
app.use('/appointments/delete', authUtils.permitOnlyForAdmin, appointmentRouter);

app.use('/patients/delete', authUtils.permitOnlyForAdmin, patientRouter);



const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });


app.use('/', indexRouter);


app.use('/projects',  authUtils.permitAuthenticatedUser, projectRouter);
app.use('/registrations', authUtils.permitAuthenticatedUser, registrationRouter);

app.use('/doctors', doctorRouter);
app.use('/api/doctors', docApiRouter);
app.use('/api/appointments', appApiRouter);
app.use('/api/patients', patApiRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
