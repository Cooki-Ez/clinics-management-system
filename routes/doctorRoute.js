const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
router.get('/', doctorController.showDoctorList);
router.get('/add', doctorController.showAddDoctorForm);
router.get('/edit/:doctor_id', doctorController.showEditDoctorForm);
router.get('/details/:doctor_id', doctorController.showDoctorDetails);

//router.get('/edit/:doctor_id/:projectId', doctorController.newTask);

router.post('/add', doctorController.addDoctor);
router.post('/edit', doctorController.updateDoctor);

router.get('/delete/:doctor_id', doctorController.deleteDoctor);


module.exports = router;