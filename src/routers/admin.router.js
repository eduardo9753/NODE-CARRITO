const router = require('express').Router();

//ADMIN CONTROLLER
const adminController = require('../controllers/admin.controller');

const { isAuthenticated } = require('../helpers/auth');

router.get('/admin/admin/login' , adminController.adminLogin);
router.post('/admin/admin/add' , adminController.adminSignin);
router.get('/admin/admin/home' ,adminController.home);
router.get('/admin/admin/logout' , adminController.logout);

module.exports = router;