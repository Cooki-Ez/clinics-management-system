const sequelize = require('./sequelize');

const Doctor = require('../../model/sequelize/doctor');
const Patient = require('../../model/sequelize/patient');
const Appointment = require('../../model/sequelize/appointment');
const Project = require('../../model/sequelize/project');
const Registration = require('../../model/sequelize/registration');

const authUtil = require('../../util/authUtils');


module.exports = () => {
    Doctor.hasMany(Appointment, {as: "appointments", foreignKey: {name: 'doctor_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Appointment.belongsTo(Doctor, {as: "doctor", foreignKey: {name: 'doctor_id', allowNull: false}});
    Patient.hasMany(Appointment, {as: "appointments", foreignKey: {name: 'patient_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Appointment.belongsTo(Patient, {as: "patient", foreignKey: {name: 'patient_id', allowNull: false}});

    Project.hasMany(Registration, {as:"registrations", foreignKey:{name:'project_id', allowNull:false}, constraints: true, onDelete: 'CASCADE'});
    Registration.belongsTo(Project, {as: "project", foreignKey: {name:'project_id', allowNull: false}});
    Doctor.hasMany(Registration, {as: "registrations", foreignKey:{name:'doctor_id', allowNull:true}, constraints:true, onDelete: 'CASCADE'});
    Registration.belongsTo(Doctor, {as:"doctor", foreignKey:{name:'doctor_id', allowNull: false}});



    let allDocs, allPats, allRegistrations, allProjects;
    return sequelize
        .sync({force: true})
        .then(patients =>{
            allPats = patients;
            return Project.findAll();
        })
        .then( projects =>{
            if(!projects || projects.length == 0){
                return Project.bulkCreate([
                    {name: 'Project1', mainTask: 'Main task1',dateStart:'02/02/2022', dateEnd:'02/02/2023'},
                    {name: 'Project2', mainTask: 'Main task2',dateStart:'05/05/2018', dateEnd:'02/02/2023'},
                ])
                    .then(()=>{
                        return Project.findAll();
                    });
            } else {
                return projects;
            }
        })

        .then(projs =>{
            allProjects = projs;
            return Patient.findAll();
        })
        .then(pats =>{
            if(!pats || pats.length == 0){
                return Patient.bulkCreate([
                    {firstName: 'Aliaksei', surname: 'Krypovalov', phoneNumber: '+48 234 567 891'},
                    {firstName: 'Anton', surname: 'Malishevski', phoneNumber: '+48 552 886 993'},
                    {firstName: 'Yaga', surname: 'Baba', phoneNumber: '+48 554 882 771'}
                ])
                    .then(() => {
                        return Patient.findAll();
                    });
            } else {
                return pats;
            }
        })
        .then(pats => {
            allPats = pats;
            return Doctor.findAll();
        })
        .then(docs => {
            if(!docs || docs.length == 0){
                return Doctor.bulkCreate([
                    {firstName: 'Nazar', surname: 'Lytvyn', salary: '5000', password: authUtil.hashPassword('1111'), phoneNumber: '+48 111 111 111', isAdmin: true},
                    {firstName: 'John', surname: 'Smith', salary: '4000', password: authUtil.hashPassword('2222'), phoneNumber: '+48 222 222 222', isAdmin: false},
                    {firstName: 'Rock', surname: 'Scala', salary: '6000', password:authUtil.hashPassword('3333'), phoneNumber: '+48 333 333 333', isAdmin: false}
                ])
                    .then(() => {
                        return Doctor.findAll();//
                    })
            } else {
                return docs;
            }
        })
        .then(docs => {
            allDocs = docs;
            return Registration.findAll();
        })
        .then(Registrations =>{
            if(!Registrations || Registrations.length == 0){
                return Registration.bulkCreate([
                    {registrationDate:'03/03/2022', registrationTime:'14:23:55', doctor_id: allDocs[0]._id,project_id: allProjects[0]._id, doctorTask: 'Task for Nazar Lytvyn', isManager: false},
                   // {registrationDate:'03/03/2022', registrationTime:'14:23:55', doctor_id: allDocs[1]._id,project_id: allProjects[0]._id, doctorTask: 'Task for John Smith', isManager: false},
                    {registrationDate:'04/04/2022', registrationTime:'18:03:21', doctor_id: allDocs[2]._id,project_id: allProjects[0]._id, doctorTask:'One more task for Rock Scala', isManager: true},
                    {registrationDate:'03/01/2019', registrationTime:'14:14:12', doctor_id: allDocs[1]._id,project_id: allProjects[1]._id, isManager:true},
                    {registrationDate:'04/09/2018', registrationTime:'05:06:23', doctor_id: allDocs[2]._id,project_id: allProjects[1]._id, doctorTask:'Task for Rock Scala'},
                ])
                    .then(() =>{
                        return Registration.findAll();
                    })
            } else {
                return Registrations;
            }
        })
        .then(regs =>{
            allRegistrations = regs;
            return Appointment.findAll();
        })
        .then(apps => {
            if(!apps || apps.length == 0){
                return Appointment.bulkCreate([
                    {patient_id: allPats[0]._id, doctor_id: allDocs[0]._id, date: '02/02/2019', timeFrom: '14:00', timeTo: '15:00'},
                    {patient_id: allPats[1]._id, doctor_id: allDocs[1]._id, date: '03/03/2020', timeFrom: '04:00', timeTo: '05:00'},

                ]);
            } else {
                return apps;
            }
        });
};