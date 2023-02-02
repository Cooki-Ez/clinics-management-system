const PatientRepository = require('../repository/sequelize/PatientRepository');

exports.getPatients = (req, res, next) => {
    PatientRepository.getPatients()
        .then(pats => {
            res.status(200).json(pats);
        })
        .catch(err =>{
            console.log(err);
        });
};

exports.getPatientById = (req, res, next) =>{
    const patId = req.params.patId;
    PatientRepository.getPatientById(patId)
        .then(pat => {
            if(!pat){
                res.status(404).json({
                    message: 'Patient with id ' + patId + ' not found'
                })
            } else {
                res.status(200).json(pat);
            }
        });
};

exports.createPatient = (req, res, next) =>{
    PatientRepository.createPatient(req.body)
        .then(newObj =>{
            res.status(201).json(newObj);
        })
        .catch(err =>{
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

exports.updatePatient = (req, res, next) => {
    const patId = req.params.patId;
    PatientRepository.updatePatient(patId, req.body)
        .then(result => {
            res.status(200).json({message: 'Patient updated', pat: result});
        })
        .catch(err => {
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

exports.deletePatient = (req, res, next) => {
    const patId = req.params.patId;
    PatientRepository.deletePatient(patId)
        .then(result => {
            res.status(200).json({message: 'Removed Patient', pat: result});
        })
        .catch(err => {
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

