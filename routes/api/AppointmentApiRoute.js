const express = require('express');
const router = express.Router();

const appApiController = require('../../api/AppointmentAPI');

router.get('/', appApiController.getAppointments);
router.get('/:appointmentId', appApiController.getAppointmentById);
router.post('/', appApiController.createAppointment);
router.put('/:appointmentId', appApiController.updateAppointment);
router.delete('/:appointmentId', appApiController.deleteAppointment);

module.exports = router;