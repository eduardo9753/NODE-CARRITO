const  router  = require('express').Router();

//CONTROLLER INDEX
const indexController = require('../controllers/index.controller');


router.get('/' , indexController.index); //VIEW HOME
router.get('/products/all/:page' , indexController.allProducts);//ALL PRODUCTS
router.get('/products/category/:slug/:page' , indexController.productsByCategory);//VIEWS FOR CATEGORY
router.get('/products/view/:id' , indexController.productsView);//VIEW BY ID
router.get('/about' , indexController.about); //ABOUT

//EXPORT
module.exports = router;