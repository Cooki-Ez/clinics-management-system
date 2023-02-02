const express = require('express');
const router = express.Router();

const patApiController = require('../../api/PatientAPI');

router.get('/', patApiController.getPatients);
router.get('/:patId', patApiController.getPatientById);
router.post('/', patApiController.createPatient);
router.put('/:patId', patApiController.updatePatient);
router.delete('/:patId', patApiController.deletePatient);

module.exports = router;