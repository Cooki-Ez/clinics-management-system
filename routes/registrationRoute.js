const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.get('/', registrationController.showRegistrationList);
router.get('/add', registrationController.showRegistrationFormNew);
router.get('/edit/:registrationId', registrationController.showEditRegistrationForm);
router.get('/details/:registrationId', registrationController.showRegistrationDetails);

router.post('/add', registrationController.addRegistration);
router.post('/edit', registrationController.updateRegistration);
router.get('/delete/:registrationId', registrationController.deleteRegistration);
module.exports = router;