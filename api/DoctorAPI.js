const DoctorRepository = require('../repository/sequelize/DoctorRepository');

exports.getDoctors = (req, res, next) => {
    DoctorRepository.getDoctors()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err =>{
            console.log(err);
        });
};

exports.getDoctorById = (req, res, next) =>{
    const doctor_id = req.params.docId;
    DoctorRepository.getDoctorById(doctor_id)
        .then(doc => {
            if(!doc){
                res.status(404).json({
                    message: 'Doctor with id ' + doctor_id + ' not found'
                })
            } else {
                res.status(200).json(doc);
            }
        });
};

exports.createDoctor = (req, res, next) =>{
    DoctorRepository.createDoctor(req.body)
        .then(newObj =>{
            res.status(201).json(newObj);
        })
        .catch(err =>{
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

exports.updateDoctor = (req, res, next) => {
    const doctor_id = req.params.docId;
    DoctorRepository.updateDoctor(doctor_id, req.body)
        .then(result => {
            res.status(200).json({message: 'Doctor updated', doctor: result});
        })
        .catch(err => {
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

exports.deleteDoctor = (req, res, next) => {
    const doctor_id = req.params.docId;
    DoctorRepository.deleteDoctor(doctor_id)
        .then(result => {
            res.status(200).json({message: 'Removed doctor', doctor: result});
        })
        .catch(err => {
            if(!err.statusCode) err.statusCode = 500;
            next(err);
        });
};

