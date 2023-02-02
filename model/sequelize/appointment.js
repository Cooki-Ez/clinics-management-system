const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Appointment = sequelize.define('Appointment', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'validationMessage.fieldRequired'
            },
            isNotBeforeToday(value) {
                if (new Date(value).toISOString().split('T')[0] < new Date().toISOString().split('T')[0]) throw new Error('validationMessage.date-in-pastError');
            },
        }
    },
    timeFrom: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
        }
    },
    timeTo: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
            isNotBeforeTimeFrom(value) {
                if (!value) throw new Error('validationMessage.fieldRequired');
                else if (value < this.timeFrom) {
                    throw new Error('validationMessage.time-from-later-than-time-toError');
                }
            }
        }
    },

    patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNotDefault(value) {
                if (value === '-1') {
                    throw new Error('validationMessage.fieldRequired');
                }
            }
        }

    },
    doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNotDefault(value) {
                if (value === '-1') {
                    throw new Error('validationMessage.fieldRequired');
                }
            }
        }

    }
});

module.exports = Appointment;