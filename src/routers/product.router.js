const router = require('express').Router();

//CONTROLLER CATEGORY
const productController = require('../controllers/product.controller');


router.get('/admin/product/products' , productController.index);//View PRODUCT
router.get('/admin/product/products/add' , productController.form);// FORM PRODUCT
router.post('/admin/product/products/addForm' , productController.formAdd);//DATA FORM PRODUCT

router.get('/admin/product/products/edit/:id' , productController.edit);//DATA EDIT
router.post('/admin/product/products/update/:id', productController.update);//UPDATE DATA

router.delete('/admin/product/products/delete/:id' , productController.delete);//DELETE PRODUCT

module.exports = router;