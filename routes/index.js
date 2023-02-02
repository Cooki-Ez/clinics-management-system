var express = require('express');
var router = express.Router();

const langController = require('../controllers/langController');
router.get('/changeLang/:lang', langController.changeLang);

const AuthController = require('../controllers/authController');
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req,res,next){
  res.render('index', {navLocation:'main' });
});


module.exports = router;
