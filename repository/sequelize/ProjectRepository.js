const Doctor = require('../../model/sequelize/doctor');
const Patient = require('../../model/sequelize/patient');
const Appointment = require('../../model/sequelize/appointment');
const Project = require('../../model/sequelize/project');
const Registration = require('../../model/sequelize/registration')
const authUtil = require('../../util/authUtils');

exports.getProjects = () => {
    return Project.findAll({
        include: [
            {
                model: Registration,
                as: 'registrations',
                include: [{
                    model: Doctor,
                    as: 'doctor',
                    include: [{
                        model: Appointment,
                        as: 'appointments',
                        include: [{
                            model: Patient,
                            as: 'patient'
                        }]
                    }]
                }]
            }]
    });
};

exports.getProjectById = (pro_id) => {
    return Project.findByPk(pro_id,
        {
            include: [
                {
                    model: Registration,
                    as: 'registrations',
                    include: [{
                        model: Doctor,
                        as: 'doctor',
                        include: [{
                            model: Appointment,
                            as: 'appointments',
                            include: [{
                                model: Patient,
                                as: 'patient'
                            }]
                        }]
                    }]
                }]
        });
};


exports.createProject = (newProData) => {
    return Project.create({
            name: newProData.name,
            mainTask: newProData.mainTask,
        dateStart: newProData.dateStart,
        dateEnd: newProData.dateEnd
        }
        //, {validate: false}
    );
};

exports.updateProject = (pro_id, proData) => {
    return Project.update(proData, {
        where: {_id: pro_id}
        //  , validate: false
    })
}

exports.deleteProject = (proId) => {
    return Project.destroy({
        where: {_id: proId}
    });
};