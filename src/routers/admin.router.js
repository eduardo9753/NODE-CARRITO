const router = require('express').Router();

//ADMIN CONTROLLER
const adminController = require('../controllers/admin.controller');

//AUTHENTICATE ADMIN
const { isAdmin } = require('../helpers/auth');

router.get('/admin/admin/login' , adminController.adminLogin);   //FORM DE LOGEO
router.post('/admin/admin/add' , adminController.adminSignin);   //LOGEO ADMIN
router.get('/admin/admin/home' , isAdmin , adminController.home);//PROFILE
router.get('/admin/admin/logout' , adminController.logout);      //LOGOUT

module.exports = router;