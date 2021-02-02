const router = require('express').Router();

//CONTROLLER CATEGORY
const categoryController = require('../controllers/category.controller');


router.get('/admin/category/categories' , categoryController.index);//ViewCategory
router.get('/admin/category/categories/add' , categoryController.form);//FORM CATEGORY
router.post('/admin/category/categories/addForm' , categoryController.formAdd);//DATA FORM CATEGORIES

router.get('/admin/category/categories/edit/:id', categoryController.edit);//DATA EDIT PAGE
router.post('/admin/category/categories/update/:id' , categoryController.update);//UPDATE EDIT

router.delete('/admin/category/categories/delete/:id' , categoryController.delete);//DELETE PAGE

//EXPORTAMOS
module.exports = router;