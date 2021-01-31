const router = require('express').Router();

//CONTROLLER CATEGORY
const productController = require('../controllers/product.controller');


router.get('/product/products' , productController.index);//View PRODUCT
router.get('/product/products/add' , productController.form);// FORM PRODUCT
router.post('/product/products/addForm' , productController.formAdd);//DATA FORM PRODUCT

router.get('/product/products/edit/:id' , productController.edit);//DATA EDIT
router.post('/product/products/update/:id', productController.update);//UPDATE DATA

router.delete('/product/products/delete/:id' , productController.delete);//DELETE PRODUCT

module.exports = router;