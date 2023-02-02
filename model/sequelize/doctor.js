const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const has = require('../../util/authUtils');
const Doctor = sequelize.define('Doctors', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
    type: Sequelize.STRING,
    allowNull:false,
        validate: {
            checkFirstName (value){
                if(!value) throw new Error('validationMessage.fieldRequired');
                else if (value.length < 2 || value.length > 30)
                    throw new Error('validationMessage.2-30charError');
            },
        }
    },
    surname: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
            checkLastName (value){
                if(!value) throw new Error('validationMessage.fieldRequired');
                else if (value.length < 2 || value.length > 30)
                    throw new Error('validationMessage.2-30charError');
            },
        }
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            customValidator (value){
                if(!value) throw new Error('validationMessage.fieldRequired')
                else if(isNaN(value)) throw new Error('validationMessage.number-format');
                else if(value < 2000 || value > 1_000_000) throw new Error('validationMessage.number-value2k-1kk');
            }
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'validationMessage.phone-number-already-in-use'
        },
        validate: {
            customValidator(value){
                if (!value || value === "")
                    throw new Error('validationMessage.fieldRequired')
                value = value.toString().trim();
                const re = /^(\+\d{2} ?)?\d{3} ?\d{3} ?\d{3}$/;
                if(!re.test(value)) throw new Error('validationMessage.phone-format')
                return re.test(value);
            }

        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len:{
                args: [3,12],
                msg:"validationMessage.password-format"
            },
            set(value) {
                // Storing passwords in plaintext in the database is terrible.
                // Hashing the value with an appropriate cryptographic hash function is better.
                this.setDataValue('password', has.hashPassword(value));
            }
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

});

module.exports = Doctor;