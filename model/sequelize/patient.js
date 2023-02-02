const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Patient = sequelize.define('Patients', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            customValidator (value){
                if(!value) throw new Error('validationMessage.fieldRequired');
                if(value.length < 2 || value.length > 30) throw new Error('validationMessage.2-30charError');
            }
        }
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            customValidator (value){
                if(!value) throw new Error('validationMessage.fieldRequired');
                if(value.length < 2 || value.length > 30) throw new Error('validationMessage.2-30charError');
            }
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            customValidator(value){
                if(!(typeof value === 'string')) value = value.toString();
                value = value.trim();
                const re = /^(\+\d{2} ?)?\d{3} ?\d{3} ?\d{3}$/;
                if(!re.test(value) && value!='') throw new Error('validationMessage.phone-format');
            }
        }
    },
});



module.exports = Patient;