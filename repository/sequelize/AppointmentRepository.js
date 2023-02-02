const Sequelize = require('sequelize');

const Doctor = require('../../model/sequelize/doctor');
const Patient = require('../../model/sequelize/patient');
const Appointment = require('../../model/sequelize/appointment');

exports.getAppointments = () => {
    return Appointment.findAll({
        include: [
            {
                model: Doctor,
                as: 'doctor'
            },
            {
                model: Patient,
                as: 'patient'
            }
        ]
    });
};

exports.getAppointmentById = (appointmentId) => {
    return Appointment.findByPk(appointmentId, {
        include: [
            {
                model: Doctor,
                as: 'doctor'
            },
            {
                model: Patient,
                as: 'patient'
            }
        ]
    });
};

exports.createAppointment = (data) => {
    return Appointment.create({
            doctor_id: data.doctor_id,
            patient_id: data.patient_id,
            date: data.date,
            timeFrom: data.timeFrom,
            timeTo: data.timeTo
        }
        // , {validate:false}
    );
};

exports.updateAppointment = (appointmentId, data) => {
    return Appointment.update(data, {
        where: {_id: appointmentId}
        //   , validate:false
    });
}

exports.deleteAppointment = (appointmentId) => {
    return Appointment.destroy({
        where: {_id: appointmentId}
    });
}

