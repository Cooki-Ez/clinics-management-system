const Doctor = require('../../model/sequelize/doctor');
const Patient = require('../../model/sequelize/patient');
const Appointment = require('../../model/sequelize/appointment');
const Project = require('../../model/sequelize/project');
const Registration = require('../../model/sequelize/registration')
const authUtil = require('../../util/authUtils');

exports.getDoctors = () => {
    return Doctor.findAll({
        include: [
            {
                model: Appointment,
                as: 'appointments',
                include: [{
                    model: Patient,
                    as: 'patient'
                }],
            },
            {
                model: Registration,
                as: 'registrations',
                include: [{
                    model: Project,
                    as: 'project'
                }],
            }]
    });
};

exports.getDoctorById = (docId) => {
    return Doctor.findByPk(docId,
        {
            include: [
                {
                model: Appointment,
                as: 'appointments',
                include: [{
                    model: Patient,
                    as: 'patient'
                }],
            },
                {
                model: Registration,
                as: 'registrations',
                include: [{
                    model: Project,
                    as: 'project'
                }],
            }]
        });
};

exports.findByPhone = (phoneNumber) => {
    return Doctor.findOne({
            where: {phoneNumber: phoneNumber}
        }
        //, {validate: false}
    );
}

exports.createDoctor = (newDocData) => {
    return Doctor.create({
            firstName: newDocData.firstName,
            surname: newDocData.surname,
            salary: newDocData.salary,
            phoneNumber: newDocData.phoneNumber,
            password:
                //authUtil.hashPassword(
                newDocData.password,
            //),    //if will be time fix pass
            isAdmin: newDocData.isAdmin,
            //isManager: newDocData.isManager
            //project_id: newDocData.project_id
        }
        //, {validate: false}
    );
};

exports.assignTask = (docId, task) => {
    // const doc = Doctor.findOne({
    //     where:{_id: docId}
    // });
    // doc.task = task;
    // this.updateDoctor(docId, doc);
    return Doctor.findOne({
        where: {_id: docId}
    }).then(doc => {
        doc.task = task;
    })
}

exports.updateDoctor = (docId, docData) => {
    return Doctor.update(docData, {
        where: {_id: docId}
        //  , validate: false
    })
}

exports.deleteDoctor = (docId) => {
    return Doctor.destroy({
        where: {_id: docId}
    });
};