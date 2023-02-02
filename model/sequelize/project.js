const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Project = sequelize.define('Projects', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            checkFirstName(value) {
                if (!value) throw new Error('validationMessage.fieldRequired');
                else if (value.length < 2 || value.length > 30)
                    throw new Error('validationMessage.2-30charError');
            },
        }
    },
    mainTask: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            checkFirstName(value) {
                if (!value) throw new Error('validationMessage.fieldRequired');
                else if (value.length < 2 || value.length > 30)
                    throw new Error('validationMessage.2-30charError');
            },
        }
    },
    dateStart: {
        type: Sequelize.DATE,
        allowNull:false,
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
    dateEnd:{
        type: Sequelize.DATE,
        allowNull:false,
        validate: {
            isNotBeforeToday(value){
                if(!value)throw new Error('validationMessage.fieldRequired');
                if (this.dateEnd < this.dateStart) throw new Error('validationMessage.date-in-pastError');
            },
        }
    },
});

module.exports = Project;