const router = require('express').Router();

//CONTROLLER ADMIN
const pageController = require('../controllers/page.controller');

router.get('/admin/page/pages' , pageController.index);//VIEW PRINCIPAL
router.get('/admin/page/pages/add' , pageController.form);//VISTA FORM
router.post('/admin/page/pages/addForm' , pageController.formAdd);//DATA VIEWS FORM
router.post('/admin/pages/reorder-pages' , pageController.reorder);//REORDER TABLE PAGE

router.get('/admin/page/pages/edit/:id', pageController.edit);//DATA EDIT PAGE
router.post('/admin/page/pages/update/:id' , pageController.update);//UPDATE EDIT

router.delete('/admin/page/pages/delete/:id' , pageController.delete);//DELETE PAGE

//EXPORT
module.exports = router;