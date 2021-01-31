const router = require('express').Router();

//CONTROLLER CATEGORY
const categoryController = require('../controllers/category.controller');


router.get('/category/categories' , categoryController.index);//ViewCategory
router.get('/category/categories/add' , categoryController.form);//FORM CATEGORY
router.post('/category/categories/addForm' , categoryController.formAdd);//DATA FORM CATEGORIES

router.get('/category/categories/edit/:id', categoryController.edit);//DATA EDIT PAGE
router.post('/category/categories/update/:id' , categoryController.update);//UPDATE EDIT

router.delete('/category/categories/delete/:id' , categoryController.delete);//DELETE PAGE

//EXPORTAMOS
module.exports = router;