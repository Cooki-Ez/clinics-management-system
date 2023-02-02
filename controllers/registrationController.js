const RegistrationRepository = require('../repository/sequelize/registrationRepository');
const ProjectRepository = require('../repository/sequelize/projectRepository');
const DoctorRepository = require('../repository/sequelize/doctorRepository');

exports.showRegistrationList = (req, res, next) => {
    RegistrationRepository.getRegistrations()
        .then(registrations => {
            res.render('pages/registration/list', {
                registrations: registrations,
                navLocation: 'registrations',
                validationErrors: []
            });
        });
}

exports.showRegistrationFormNew = (req, res, next) => {
    let allProjects, allDoctors;
    ProjectRepository.getProjects()
        .then(projects =>{
          allProjects = projects;
          return DoctorRepository.getDoctors();
        })
        .then(doctors =>{
            allDoctors  = doctors;
            res.render('pages/registration/form', {
                registration: {},
                allProjects: allProjects,
                allDoctors: allDoctors,
                formMode: 'createNew',
                pageTitle: req.__('registration.form.add.pageTitle'),
                btnLabel: req.__('registration.form.add.btnLabel'),
                formAction: '/registrations/add',
                navLocation: 'registrations',
                validationErrors: []
            });
        });
};

exports.showEditRegistrationForm = (req, res, next) => {
    const reg_id = req.params.registrationId;
    let allProjects, allDoctors;
    ProjectRepository.getProjects()
        .then(projects =>{
            allProjects = projects;
            return DoctorRepository.getDoctors();
        })
        .then(doctors =>{
            allDoctors = doctors;
            return RegistrationRepository.getRegistrationById(reg_id);
        })
        .then(registration => {
            res.render('pages/registration/form', {
                registration: registration,
                allProjects: allProjects,
                allDoctors: allDoctors,
                formMode: 'edit',
                pageTitle: req.__('registration.form.edit.pageTitle'),
                btnLabel: req.__('registration.form.edit.btnLabel'),
                formAction: '/registrations/edit',
                navLocation: 'registrations',
                validationErrors: []
            });
        });
};

exports.showRegistrationDetails = (req, res, next) => {
    const reg_id = req.params.registrationId;
    let allProjects, allDoctors;
    ProjectRepository.getProjects()
        .then(projects =>{
            allProjects = projects;
            return DoctorRepository.getDoctors();
        })
        .then(doctors =>{
            allDoctors = doctors;
            return RegistrationRepository.getRegistrationById(reg_id);
        })
        .then(registration => {
            res.render('pages/registration/form', {
                registration: registration,
                allProjects: allProjects,
                allDoctors: allDoctors,
                formMode: 'showDetails',
                pageTitle: req.__('registration.form.details.pageTitle'),
                formAction: '/registrations/details',
                navLocation: 'registrations',
                validationErrors: []
            });
        });

};

//POST
exports.addRegistration = (req, res, next) => {
    const regData = {...req.body};
    RegistrationRepository.createRegistration(regData)
        .then(() => {
            res.redirect('/registrations');
        })
        .catch(err => {
            let allProjects, allDoctors;
            const projectPromise = ProjectRepository.getProjects();
            const doctorPromise = DoctorRepository.getDoctors();
            Promise.all([projectPromise, doctorPromise])
                .then(([projects, doctors]) =>{
                    res.render('pages/registration/form', {
                        registration: regData,
                        formMode: 'createNew',
                        pageTitle: req.__('registration.form.add.pageTitle'),
                        btnLabel: req.__('registration.form.add.btnLabel'),
                        formAction: '/registrations/add',
                        navLocation: 'registrations',
                        allProjects: projects,
                        allDoctors: doctors,
                        validationErrors: err.errors
                    });
                });
        });
};

exports.updateRegistration = (req, res, next) => {
    const red = req.session.admin ? '/registrations' : '/projects';
    const reg_id = req.body._id;
    const registrationData = {...req.body};
    RegistrationRepository.updateRegistration(reg_id, registrationData)
        .then(()=>{
            res.redirect(red);
        })
        .catch(err =>{
            let allProjects, allDoctors;
            const projectPromise = ProjectRepository.getProjects();
            const doctorPromise = DoctorRepository.getDoctors();
            Promise.all([projectPromise, doctorPromise])
                .then(([projects, doctors]) =>{
                    res.render('/pages/registration/form',{
                        registration: registrationData,
                        allProjects: projects,
                        allDoctors: doctors,
                        formMode: 'edit',
                        pageTitle: req.__('registration.form.edit.pageTitle'),
                        btnLabel: req.__('registration.form.edit.btnLabel'),
                        formAction: '/registration/edit',
                        navLocation: 'registrations',
                        validationErrors: []
                    })
                })
        })


};

exports.deleteRegistration = (req, res, next) => {
    const reg_id = req.params.registrationId;
    RegistrationRepository.deleteRegistration(reg_id)
        .then(() => {
            res.redirect('/registrations');
        });
};