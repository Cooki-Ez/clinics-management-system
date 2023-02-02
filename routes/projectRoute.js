const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
router.get('/', projectController.showProjectList);
router.get('/add', projectController.showProjectFormNew);
router.get('/edit/:projectId', projectController.showEditProjectForm);
router.get('/details/:projectId', projectController.showProjectDetails);

router.post('/add', projectController.addProject);
router.post('/edit', projectController.updateProject);
router.get('/delete/:projectId', projectController.deleteProject);
module.exports = router;