const Doctor = require('../../model/sequelize/doctor');
const Patient = require('../../model/sequelize/patient');
const Appointment = require('../../model/sequelize/appointment');

exports.getPatients = () => {
    return Patient.findAll(
        {
            include: [{
                model: Appointment,
                as: 'appointments',
                include: [{
                    model: Doctor,
                    as: 'doctor'
                }]
            }]
        }
    );
};

exports.getPatientById = (patId) =>{
    return Patient.findByPk(patId,
        {
            include: [{
                model: Appointment,
                as: 'appointments',
                include: [{
                    model: Doctor,
                    as: 'doctor'
                }]
            }]
        });
};

exports.createPatient = (newPatData) => {
    return Patient.create({
        firstName: newPatData.firstName,
        surname: newPatData.surname,
        phoneNumber: newPatData.phoneNumber
    }
    //, {validate:false}
    );
};

exports.updatePatient = (patId, patData) =>{
    return Patient.update(patData, {where: {_id: patId}
    //,validate:false
    });
};

exports.deletePatient = (patId) => {
    return Patient.destroy({
        where: {_id: patId}
    });
};