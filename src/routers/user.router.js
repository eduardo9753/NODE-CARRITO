const router  = require('express').Router();


//CONTROLLER USER
const userController = require('../controllers/user.controller');

//LOGEO DE USUARIOS
router.get('/user/signin' , userController.signinForm);
router.post('/user/signin/add' , userController.signinFormAdd);

//REGISTRO DE USUARIOS
router.get('/user/signup' , userController.signupForm);
router.post('/user/signup/add' , userController.signupFormAdd);

router.get('/user/logout' , userController.logout);//

module.exports = router;