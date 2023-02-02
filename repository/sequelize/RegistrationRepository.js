const Doctor = require('../../model/sequelize/doctor');
const Registration = require('../../model/sequelize/registration');
const Project = require('../../model/sequelize/project')
const authUtil = require('../../util/authUtils');
const Appointment = require("../../model/sequelize/appointment");
const Patient = require("../../model/sequelize/patient");

exports.getRegistrations = () => {
    return Registration.findAll({
        include: [
            {
                model: Doctor,
                as: 'doctor',
                include:[{
                    model: Appointment,
                    as: 'appointments',
                    include: [{
                        model: Patient,
                        as: 'patient'
                    }]
                }]
            },
            {
                model: Project,
                as: 'project'
            }]
    });
};

exports.getRegistrationById = (reg_id) => {
    return Registration.findByPk(reg_id,
        {
            include: [
                {
                    model: Doctor,
                    as: 'doctor',
                    include:[{
                        model: Appointment,
                        as: 'appointments',
                        include: [{
                            model: Patient,
                            as: 'patient'
                        }]
                    }]
                },
                {
                    model: Project,
                    as: 'project'
                }]
        });
};


exports.createRegistration = (newRegData) => {
    return Registration.create({
            registrationDate: newRegData.registrationDate,
            registrationTime: newRegData.registrationTime,
            doctorTask: newRegData.doctorTask,
            doctor_id: newRegData.doctor_id,
            project_id: newRegData.project_id,
        isManager: newRegData.isManager
        }
        //, {validate: false}
    );
};

exports.updateRegistration = (reg_id, regData) => {
    return Registration.update(regData, {
        where: {_id: reg_id}
        //  , validate: false
    })
}

exports.deleteRegistration = (regId) => {
    return Registration.destroy({
        where: {_id: regId}
    });
};