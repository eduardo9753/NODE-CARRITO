const  router  = require('express').Router();

//CONTROLLER INDEX
const indexController = require('../controllers/index.controller');


router.get('/' , indexController.index); //VIEW HOME
router.get('/products/all' , indexController.allProducts);//ALL PRODUCTS
router.get('/products/category/:slug' , indexController.productsByCategory);//VIEWS FOR CATEGORY
router.get('/products/view/:id' , indexController.productsView);//VIEW BY ID

//EXPORT
module.exports = router;