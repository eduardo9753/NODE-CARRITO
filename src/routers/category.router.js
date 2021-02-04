const router = require('express').Router();

//CONTROLLER CATEGORY
const categoryController = require('../controllers/category.controller');

//AUTHENTICATION ADMIN
const { isAdmin } = require('../helpers/auth');

router.get('/admin/category/categories' , isAdmin , categoryController.index);//ViewCategory
router.get('/admin/category/categories/add' , isAdmin , categoryController.form);//FORM CATEGORY
router.post('/admin/category/categories/addForm' , isAdmin , categoryController.formAdd);//DATA FORM CATEGORIES

router.get('/admin/category/categories/edit/:id', isAdmin , categoryController.edit);//DATA EDIT PAGE
router.post('/admin/category/categories/update/:id' , isAdmin , categoryController.update);//UPDATE EDIT

router.delete('/admin/category/categories/delete/:id' , isAdmin , categoryController.delete);//DELETE PAGE

//EXPORTAMOS
module.exports = router;