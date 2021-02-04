const router = require('express').Router();

//CONTROLLER CATEGORY
const productController = require('../controllers/product.controller');

//AUTHENTICATION ADMIN
const { isAdmin } = require('../helpers/auth');

router.get('/admin/product/products' , isAdmin , productController.index);//View PRODUCT
router.get('/admin/product/products/add' , isAdmin , productController.form);// FORM PRODUCT
router.post('/admin/product/products/addForm' , isAdmin , productController.formAdd);//DATA FORM PRODUCT

router.get('/admin/product/products/edit/:id' , isAdmin , productController.edit);//DATA EDIT
router.post('/admin/product/products/update/:id', isAdmin , productController.update);//UPDATE DATA

router.delete('/admin/product/products/delete/:id' , isAdmin , productController.delete);//DELETE PRODUCT

module.exports = router;