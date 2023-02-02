const express = require('express');
const router = express.Router();

const docApiController = require('../../api/DoctorAPI');

router.get('/', docApiController.getDoctors);
router.get('/:doctor_id', docApiController.getDoctorById);
router.post('/', docApiController.createDoctor);
router.put('/:doctor_id', docApiController.updateDoctor);
router.delete('/:doctor_id', docApiController.deleteDoctor);

module.exports = router;