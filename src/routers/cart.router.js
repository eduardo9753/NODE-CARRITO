const router = require('express').Router();

//AUTHENTICATED
const { isAuthenticated } = require('../helpers/auth');

//CONTROLADOR CART
const cartController = require('../controllers/cart.controller');

router.get('/product/cart/add/:slug' , isAuthenticated , cartController.addCart);//AGREGANDO PRODUCTOS
router.get('/product/cart/checkout' , isAuthenticated , cartController.checkoutCart);//LISTA DE MIS PRODUCTOS CART
router.get('/product/cart/update/:product' , isAuthenticated , cartController.updateCart);//ACTUALIZANDO LOS PRODUCTOS
router.get('/product/cart/clear' , isAuthenticated , cartController.clearCart);//LIMPIAMOS EL CARRITO

module.exports = router;