const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const {TIME} = require("sequelize");

const Registration = sequelize.define('Registrations', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    registrationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isNotBeforeToday(value){
                if(!value)throw new Error('validationMessage.fieldRequired');
                value = value.toISOString().split('T')[0];
                let nowDate = new Date(),
                    month = '' + (nowDate.getMonth() + 1),
                    day = '' + nowDate.getDate(),
                    year = '' + nowDate.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
                const nowString = [year, month, day].join('-');
                const pattern = /(\d{4})-(\d{2})-(\d{2})/;
                if (!pattern.test(value)) {
                    console.log(value);
                    throw new Error('validationMessage.formatDateError');
                }
                const valueDate = new Date(value);
                const compareToDate = new Date(nowString);

                if (valueDate.getTime() < compareToDate.getTime()) {
                    throw new Error('validationMessage.date-in-pastError');
                }
            },
        }
    },
    registrationTime: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
            isNotBeforeNow(value){
                const inputTime = value.split(":");
                const inputHours = parseInt(inputTime[0]);
                const inputMinutes = parseInt(inputTime[1]);
                const now = new Date();
                const nowHours = now.getHours();
                const nowMinutes = now.getMinutes();
                if (inputHours < nowHours || (inputHours == nowHours && inputMinutes < nowMinutes)) {
                    throw new Error('validationMessage.date-in-pastError');
                }
            } ,
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
    },
    project_id: {
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
    doctorTask: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            customValidator(value){
                const re = /^[a-zA-Z]+$/;
                if(!re.test(value))throw new Error('validationMessage.nameFormatError');
                if((value.length < 2 || value.length > 30) && value) throw new Error('validationMessage.2-30charOrEmptyError');
            }
        }
    },
    isManager: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
});

module.exports = Registration;