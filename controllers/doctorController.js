const DoctorRepository = require('../repository/sequelize/DoctorRepository');
const authUtils = require('../util/authUtils');


exports.showDoctorList = (req, res, next) => {
    DoctorRepository.getDoctors()
        .then(doctors => {
            res.render('pages/doctor/list', {
                doctors: doctors,
                navLocation: 'doctors',
                validationErrors: []
            });
        });
};

exports.showAddDoctorForm = (req, res, next) => {
    res.render('pages/doctor/form', {
        doctor: {},
        pageTitle: req.__('doctor.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('doctor.form.add.btnLabel'),
        formAction: '/doctors/add',
        navLocation: 'doctors',
        validationErrors: []
    });
};

exports.showEditDoctorForm = (req, res, next) => {
    const doctor_id = req.params.doctor_id;
    DoctorRepository.getDoctorById(doctor_id)
        .then(doc => {
            res.render('pages/doctor/form', {
                doctor: doc,
                formMode: 'edit',
                pageTitle: req.__('doctor.form.edit.pageTitle'),
                btnLabel: req.__('doctor.form.edit.btnLabel'),
                formAction: '/doctors/edit',
                navLocation: 'doctors',
                validationErrors: []
            });
        });
};

exports.newTask = (req, res, next) =>{
    const doctor_id =  req.params.doctor_id;
    console.log(req.params);
    DoctorRepository.getDoctorById(doctor_id)
        .then(doctor => {
            res.render('pages/doctor/form', {
                doctor: doctor,
                formMode: 'newTask',
                pageTitle: 'New task',
                formAction: '',
                navLocation: 'doctors',
                validationErrors: []
            });
        });
}



exports.showDoctorDetails = (req, res, next) => {
    const doctor_id = req.params.doctor_id;
    DoctorRepository.getDoctorById(doctor_id)
        .then(doctor => {
            res.render('pages/doctor/form', {
                doctor: doctor,
                formMode: 'showDetails',
                pageTitle: req.__('doctor.form.edit.pageTitle'),
                formAction: '',
                navLocation: 'doctors',
                validationErrors: []
            });
        });

};

//POST
exports.addDoctor = (req, res, next) => {
    const docData = {...req.body};
    docData.isAdmin = req.body.isAdmin === 'on' ? true : false;
    docData.isManager = req.body.isManager === 'on' ? true : false;
    DoctorRepository.createDoctor(docData)
        .then(result => {
            res.redirect('/doctors');
        })
        .catch(err => {
            res.render('pages/doctor/form', {
                doctor: docData,
                formMode: 'createNew',
                pageTitle: req.__('doctor.form.add.pageTitle'),
                btnLabel: req.__('doctor.form.add.btnLabel'),
                formAction: '/doctors/add',
                navLocation: 'doctors',
                validationErrors: err.errors
            });
        });
};


exports.updateDoctor = (req, res, next) => {
    const docId = req.body._id;
    DoctorRepository.getDoctorById(docId)
        .then(doctor =>{
            const docData = {...req.body, appointments: doctor.appointments, registrations: doctor.registrations};
            DoctorRepository.updateDoctor(docId, docData)
                .then(() => {
                    res.redirect('/doctors');
                })
                .catch(err => {
                    res.render('pages/doctor/form', {
                        doctor: docData,
                        formMode: 'edit',
                        pageTitle: req.__('doctor.form.edit.pageTitle'),
                        btnLabel: req.__('doctor.form.edit.btnLabel'),
                        formAction: '/doctors/edit',
                        navLocation: 'doctors',
                        validationErrors: err.errors
                    });
                });
        })
};


exports.deleteDoctor = (req, res, next) => {
    const docId = req.params.doctor_id;

    DoctorRepository.deleteDoctor(docId)
        .then(() => {
            res.redirect('/doctors');
        });
};