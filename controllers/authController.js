const DoctorRepository = require('../repository/sequelize/DoctorRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const phone = req.body.phoneNumber;
    const password = req.body.password;
    DoctorRepository.findByPhone(phone)
        .then(doctor => {
            if (!doctor) {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('validationMessage.loginError')
                })
            } else if (authUtil.comparePasswords(password, doctor.password) === true) {
                req.session.loggedUser = doctor;
                req.session.admin = doctor.isAdmin;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('validationMessage.loginError')
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    req.session.admin = false;
    res.redirect('/');
}
