const AppointmentRepository = require('../repository/sequelize/AppointmentRepository');

exports.getAppointments = (req, res, next) => {
    AppointmentRepository.getAppointments()
        .then(apps => {
            res.status(200).json(apps);
        })
        .catch(err =>{
            console.log(err);
        });
};

exports.getAppointmentById = (req, res, next) =>{
    const appointmentId = req.params.appointmentId;
    AppointmentRepository.getAppointmentById(appointmentId)
        .then(app => {
            if(!app){
                res.status(404).json({
                    message: 'Appointment with id ' + appointmentId + ' not found'
                })
            } else {
                res.status(200).json(app);
            }
        });
};

exports.createAppointment = (req, res, next) =>{
    AppointmentRepository.createAppointment(req.body)
        .then(newObj =>{
            res.status(201).json(newObj);
        })
        .catch(err =>{
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

exports.updateAppointment = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    AppointmentRepository.updateAppointment(appointmentId, req.body)
        .then(result => {
            res.status(200).json({message: 'Appointment updated', app: result});
        })
        .catch(err => {
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

exports.deleteAppointment = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    AppointmentRepository.deleteAppointment(appointmentId)
        .then(result => {
            res.status(200).json({message: 'Removed Appointment', app: result});
        })
        .catch(err => {
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

