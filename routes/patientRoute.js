const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
router.get('/', patientController.showPatientsList);
router.get('/add', patientController.showPatientsFormNew);
router.get('/edit/:patientId', patientController.showPatientsFormEdit);
router.get('/details/:patientId', patientController.showPatientsDetails);

router.post('/add', patientController.addPatient);
router.post('/edit', patientController.updatePatient);
router.get('/delete/:patientId', patientController.deletePatient);
module.exports = router;