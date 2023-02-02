const PatientRepository = require('../repository/sequelize/patientRepository');

exports.showPatientsList = (req, res, next) => {
    PatientRepository.getPatients()
        .then(patients => {
            res.render('pages/patient/list', {
                patients: patients,
                navLocation: 'patients',
                validationErrors: []
            });
        });
};

exports.showPatientsFormNew = (req, res, next) => {
    res.render('pages/patient/form', { // check the location
        patient: {},
        pageTitle: req.__('patient.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('patient.form.add.btnLabel'),
        formAction: '/patients/add',
        navLocation: 'patients',
        validationErrors: []
    });
};

exports.showPatientsFormEdit = (req, res, next) => {
    const patientId = req.params.patientId;

    PatientRepository.getPatientById(patientId)
        .then(patient => {
            res.render('pages/patient/form', {
                patient: patient,
                formMode: 'edit',
                pageTitle: req.__('patient.form.edit.pageTitle'),
                btnLabel: req.__('patient.form.edit.btnLabel'),
                formAction: '/patients/edit',
                navLocation: 'patients',
                validationErrors: []
            });
        });
};

exports.showPatientsDetails = (req, res, next) => {
    const patientId = req.params.patientId;

    PatientRepository.getPatientById(patientId)
        .then(patient => {
            res.render('pages/patient/form', {
                patient: patient,
                formMode: 'showDetails',
                pageTitle: req.__('patient.form.details.pageTitle'),
                formAction: '',
                navLocation: 'patients',
                validationErrors: []
            });
        });
};

exports.addPatient = (req, res, next) => {
    const patientData = {...req.body};
    PatientRepository.createPatient(patientData)
        .then(result => {
            res.redirect('/patients');
        })
        .catch(err => {
            res.render('pages/patient/form', {
                patient: patientData,
                pageTitle: req.__('patient.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('patient.form.add.btnLabel'),
                formAction: '/patients/add',
                navLocation: 'patients',
                validationErrors: err.errors
            });
        });
};

exports.updatePatient = (req, res, next) => {
    const patientId = req.body._id;
    PatientRepository.getPatientById(patientId)
        .then(patient => {
            const patientData = {...req.body, appointments: patient.appointments};
            PatientRepository.updatePatient(patientId, patientData)
                .then(() => {
                    res.redirect('/patients');
                })
                .catch(err => {
                    res.render('pages/patient/form', {
                        patient: patientData,
                        formMode: 'edit',
                        pageTitle: req.__('patient.form.edit.pageTitle'),
                        btnLabel: req.__('patient.form.edit.btnLabel'),
                        formAction: '/patients/edit',
                        navLocation: 'patients',
                        validationErrors: err.errors
                    });
                });
        })

};

exports.deletePatient = (req, res, next) => {
    const patientId = req.params.patientId;

    PatientRepository.deletePatient(patientId)
        .then(() => {
            res.redirect('/patients');
        });
};