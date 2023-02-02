const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
router.get('/', appointmentController.showAppointmentList);
router.get('/add', appointmentController.showAppointmentFormNew);
router.get('/edit/:appointmentId', appointmentController.showAppointmentFormEdit);
router.get('/details/:appointmentId', appointmentController.showAppointmentDetails);

router.post('/add', appointmentController.addAppointment);
router.post('/edit', appointmentController.updateAppointment);
router.get('/delete/:appointmentId', appointmentController.deleteAppointment);
module.exports = router;