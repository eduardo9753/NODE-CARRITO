const router = require('express').Router();

//CONTROLLER ADMIN
const pageController = require('../controllers/page.controller');

//AUTHENTICATION ADMIN
const { isAdmin } = require('../helpers/auth');

router.get('/admin/page/pages' , isAdmin , pageController.index);//VIEW PRINCIPAL
router.get('/admin/page/pages/add' , isAdmin , pageController.form);//VISTA FORM
router.post('/admin/page/pages/addForm' , isAdmin , pageController.formAdd);//DATA VIEWS FORM
router.post('/admin/pages/reorder-pages' , isAdmin ,pageController.reorder);//REORDER TABLE PAGE

router.get('/admin/page/pages/edit/:id', isAdmin , pageController.edit);//DATA EDIT PAGE
router.post('/admin/page/pages/update/:id' , isAdmin , pageController.update);//UPDATE EDIT

router.delete('/admin/page/pages/delete/:id' , isAdmin , pageController.delete);//DELETE PAGE

//EXPORT
module.exports = router;