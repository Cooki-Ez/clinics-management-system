const DoctorRepository = require('../repository/sequelize/doctorRepository');
const ProjectRepository = require('../repository/sequelize/projectRepository');

exports.showProjectList = (req, res, next) => {
    ProjectRepository.getProjects()
        .then(projects => {
            res.render('pages/project/list', {
                projects: projects,
                navLocation: 'projects',
                validationErrors: []
            });
        });
}

exports.showProjectFormNew = (req, res, next) => {
    res.render('pages/project/form', {
        project: {},
        pageTitle:  req.__('project.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel:  req.__('project.form.add.btnLabel'),
        formAction: '/projects/add',
        navLocation: 'projects',
        validationErrors: []
    });
};

exports.showEditProjectForm = (req, res, next) => {
    const project_id = req.params.projectId;
    ProjectRepository.getProjectById(project_id)
        .then(project => {
            res.render('pages/project/form', {
                project: project,
                formMode: 'edit',
                pageTitle: req.__('project.form.edit.pageTitle'),
                btnLabel: req.__('project.form.edit.btnLabel'),
                formAction: '/projects/edit',
                navLocation: 'projects',
                validationErrors: []
            });
        });
};

exports.showProjectDetails = (req, res, next) => {
    const project_id = req.params.projectId;
    ProjectRepository.getProjectById(project_id)
        .then(project => {
            res.render('pages/project/form', {
                project: project,
                formMode: 'showDetails',
                pageTitle: req.__('project.form.details.pageTitle'),
                formAction: '',
                navLocation: 'projects',
                validationErrors: []
            });
        });

};



//POST
exports.addProject = (req, res, next) => {
    const proData = {...req.body};
    ProjectRepository.createProject(proData)
        .then(result => {
            res.redirect('/projects');
        })
        .catch(err => {
            res.render('pages/project/form', {
                project: proData,
                formMode: 'createNew',
                pageTitle: req.__('project.form.add.pageTitle'),
                btnLabel: req.__('project.form.add.btnLabel'),
                formAction: '/projects/add',
                navLocation: 'projects',
                validationErrors: err.errors
            });
        });
};

exports.updateProject = (req, res, next) => {
    const proId = req.body._id; //projectId
    ProjectRepository.getProjectById(proId)
        .then(project =>{
            const proData = {...req.body, registrations: project.registrations};
            ProjectRepository.updateProject(proId, proData)
                .then(() => {
                    res.redirect('/projects');
                })
                .catch(err => {
                    res.render('pages/project/form', {
                        project: proData,
                        formMode: 'edit',
                        pageTitle: req.__('project.form.edit.pageTitle'),
                        btnLabel: req.__('project.form.edit.btnLabel'),
                        formAction: '/projects/edit',
                        navLocation: 'projects',
                        validationErrors: err.errors
                    });
                });
        })
};

exports.deleteProject = (req, res, next) => {
    const proId = req.params.projectId;

    ProjectRepository.deleteProject(proId)
        .then(() => {
            res.redirect('/projects');
        });
};