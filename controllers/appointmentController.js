const AppointmentRepository = require('../repository/sequelize/appointmentRepository');
const PatientRepository = require('../repository/sequelize/patientRepository');
const DoctorRepository = require('../repository/sequelize/doctorRepository');

exports.showAppointmentList = (req, res, next) => {
    AppointmentRepository.getAppointments()
        .then(appointments => {
            res.render('pages/appointment/list', {
                appointments: appointments,
                navLocation: 'appointments',
                validationErrors: []
            });
        });
}

exports.showAppointmentFormNew = (req, res, next) => {
    let allPatients, allDoctors;
    PatientRepository.getPatients()
        .then(patients => {
            allPatients = patients;
            return DoctorRepository.getDoctors();
        })
        .then(doctors => {
            allDoctors = doctors;
            res.render('pages/appointment/form', {
                appointment: {},
                allPatients: allPatients,
                allDoctors: allDoctors,
                formMode: 'createNew',
                pageTitle: req.__('appointment.form.add.pageTitle'),
                btnLabel: req.__('appointment.form.add.btnLabel'),
                formAction: '/appointments/add',
                navLocation: 'appointments',
                validationErrors: []
            })
        })
}

exports.showAppointmentFormEdit = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    let allPatients, allDoctors;

    PatientRepository.getPatients()
        .then(patients => {
            allPatients = patients;
            return DoctorRepository.getDoctors();
        })
        .then(doctors => {
            allDoctors = doctors;
            return AppointmentRepository.getAppointmentById(appointmentId);
        })
        .then(appointment => {
            res.render('pages/appointment/form', {
                appointment: appointment,
                allPatients: allPatients,
                allDoctors: allDoctors,
                formMode: 'edit',
                pageTitle: req.__('appointment.form.edit.pageTitle'),
                btnLabel: req.__('appointment.form.edit.btnLabel'),
                formAction: '/appointments/edit',
                navLocation: 'appointments',
                validationErrors: []
            })

        });
}


exports.showAppointmentDetails = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    let allPatients, allDoctors;

    PatientRepository.getPatients()
        .then(patients => {
            allPatients = patients;
            return DoctorRepository.getDoctors();
        })
        .then(doctors => {
            allDoctors = doctors;
            return AppointmentRepository.getAppointmentById(appointmentId)
        })
        .then(appointment => {
            res.render('pages/appointment/form', {
                appointment: appointment,
                allPatients: allPatients,
                allDoctors: allDoctors,
                formMode: 'showDetails',
                pageTitle: req.__('appointment.form.appointments'),
                formAction: '/appointments/details',
                navLocation: 'appointments',
                validationErrors: []
            });
        });
}

exports.addAppointment = (req, res, next) => {
    const appointmentData = {...req.body};

    AppointmentRepository.createAppointment(appointmentData)
        .then(() => {
            res.redirect('/appointments');
        })
        .catch(err => {
            const patientPromise = PatientRepository.getPatients();
            const doctorPromise = DoctorRepository.getDoctors();
            Promise.all([patientPromise, doctorPromise])
                .then(([patients, doctors]) => {
                    res.render('pages/appointment/form', {
                        appointment: appointmentData,
                        pageTitle: req.__('appointment.form.add.pageTitle'),
                        btnLabel: req.__('appointment.form.add.btnLabel'),
                        formMode: 'Add',
                        formAction: '/appointments/add',
                        navLocation: 'appointments',
                        allPatients: patients,
                        allDoctors: doctors,
                        validationErrors: err.errors
                    });
                });
        });

};


exports.updateAppointment = (req, res, next) => {
    const appointmentId = req.body._id;
    const appointmentData = {...req.body};
    AppointmentRepository.updateAppointment(appointmentId, appointmentData)
        .then(result => {
            res.redirect('/appointments');
        })
        .catch(err => {
            const patientPromise = PatientRepository.getPatients();
            const doctorPromise = DoctorRepository.getDoctors();
            Promise.all([patientPromise, doctorPromise])
                .then(([patients, doctors]) => {
                    res.render('pages/appointment/form', {
                        appointment: appointmentData,
                        allPatients: patients,
                        allDoctors: doctors,
                        formMode: 'edit',
                        pageTitle: req.__('appointment.form.edit.pageTitle'),
                        btnLabel: req.__('appointment.form.edit.btnLabel'),
                        formAction: '/appointments/edit',
                        navLocation: 'appointments',
                        validationErrors: err.errors
                    });
                })


        });

};

exports.deleteAppointment = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    AppointmentRepository.deleteAppointment(appointmentId)
        .then(() => {
            res.redirect('/appointments');
        })


};