const router = require('express').Router();

//CONTROLLER ADMIN
const pageController = require('../controllers/page.controller');

router.get('/page/pages' , pageController.index);//VIEW PRINCIPAL
router.get('/pages/add' , pageController.form);//VISTA FORM
router.post('/pages/addForm' , pageController.formAdd);//DATA VIEWS FORM
router.post('/pages/reorder-pages' , pageController.reorder);//REORDER TABLE PAGE

router.get('/pages/edit/:id', pageController.edit);//DATA EDIT PAGE
router.post('/pages/update/:id' , pageController.update);//UPDATE EDIT

router.delete('/pages/delete/:id' , pageController.delete);//DELETE PAGE

//EXPORT
module.exports = router;