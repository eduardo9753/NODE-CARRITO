const cartController = {};

//MODEL PRODUCT
const Product = require('../models/Products');

cartController.addCart = async (req , res) =>{//AÑADIENDO PRODUCTOS
 try {
    const slug = req.params.slug;    //parametro de la url del "req"
    const product = await Product.findOne( {slug : slug }).lean();
    console.log('PRODUCT FOR THE CART: ' , product);
    if(typeof req.session.cart === 'undefined' ){
        let cantidad = 1;            //CANTIDAD INICIAL POR SER PRIMER PRODUCTO
        req.session.cart = [] ;      //ARREGLO VACIO ASIGNADO AL LA VARIABLE CART
        req.session.cart.push({      //EN MI VARIABLE CART GLOBAL LE ENPUJAMOS LOS DATOS DE CADA PRODUCTO
        title : slug ,               //AL VALOR TITLE LE PASO EL VALO SLUG
        cantidad : cantidad ,        //AL VALOR CANTIDAD LE PASO LA VARIABLE CANTIDAD
        price : parseFloat(product.price).toFixed(2),//AL VALOR PRECIO LE DOY EL PRECIO
        image : product.image ,      //AL VALOR IMAGE LE DOY LA IMAGE DE LA BD
        path  : product.path  ,      //AL VALOR PATH LE DOY LA RUTA DE LA IMAGEN DE BD '/PUBLIC/nobreDelaImg' 
        subtotal : parseFloat(product.price).toFixed(2)*cantidad,//OPERACION PARA SACAR LO QUE VA PAGAR
        total : parseFloat(product.price).toFixed(2)*cantidad
      });
    }else{
      const cart = req.session.cart; //CAPTURAMOS LA VARIABLE CART CON DATOS YA EXISTENTES
      let newItem =true;             //BANDERA DEL NUEVO ELEMENTO
      for(let indice=0 ; indice<cart.length ; indice++ ){//RECORRIDO DE CART PRODUCTO
          if(cart[indice].title == slug){ //SI EL PRODUCTO ES EL MISMO QUE MANDA COMO PARAMETRO
             cart[indice].cantidad++;//LE SUMAMOS LA CANTIDAD
             newItem = false;        //NUEVO VALOR ES FALSE
             cart[indice].subtotal = (cart[indice].cantidad * cart[indice].price),//ACTUAZAMOS EL PRECIO EN FUNCION
             cart[indice].total    = (cart[indice].subtotal)
             break;                  //ROMPEMOS LA CICLO                      //DELA POSICION "indice"  
          }
      }
      if(newItem){                   //SI EL NUEVO VALOR ES TRUE : QUIERE DECIR QUE ES OTRO 
             let cantidad = 1;       //CANTIDAD INICIAL POR SER PRIMER PRODUCTO
             cart.push({             //CARGAMOS EL NUEVO PRODUCTO AL CART
             title : slug,           //LE DOY EL SLUG
             cantidad : 1 ,          //LE DOY LA CANTIDAD INICIAL
             price : parseFloat(product.price).toFixed(2),//LE DOY EL PRECIO
             image : product.image , //AL VALOR IMAGE LE DOY LA IMAGE DE LA BD
             path  : product.path ,  //AL VALOR PATH LE DOY LA RUTA DE LA IMAGEN DE BD '/PUBLIC/nobreDelaImg'
             subtotal : parseFloat(product.price).toFixed(2)*cantidad,//OPERACION PARA SACAR LO QUE VA PAGAR
             total : parseFloat(product.price).toFixed(2)*cantidad
         })
      }
    }
    console.log('PRODUCT IN MY CART: ' , req.session.cart);
    req.flash("success", "Product Added to Cart .....");
    res.redirect('/products/all/1');
 } catch (error) {
   console.log(error);
 }
}


cartController.checkoutCart = (req, res) => {
  try {
      if(req.session.cart && req.session.cart === 0){
          res.render('checkout.hbs' , {Pagina : 'CheckOut'}); //render solo te pinta la pantalla
      }else if(typeof req.session.cart === 'undefined'){      //redirect va a la ruta y hace el proceso de
          res.render('checkout.hbs' , {Pagina : 'CheckOut'});
      } else{
          const cart = req.session.cart;
          const Pagina = 'CheckOut';
          let  Total = 0;
          for(let indice=0;indice<cart.length;indice++){
              Total = Total + cart[indice].total ;
          }
          console.log('DATA CART CHECKOUT: ', cart);
          const viewModel = { cart , Total , Pagina };
          res.render('checkout.hbs' ,viewModel);
      }
  } catch (error) {
      console.log(error);
  }
}

cartController.updateCart = (req, res) => {
  try {
      const slug   = req.params.product;
      const cart   = req.session.cart;
      const action = req.query.action;
      console.log('action: ',action);
      for(let indice=0 ; indice<cart.length ; indice++ ){//RECORRIDO DE CART PRODUCTO
          if(cart[indice].title === slug){
              switch (action){
                  case 'add':
                      cart[indice].cantidad++; //LE SUMAMOS LA CANTIDAD
                      cart[indice].subtotal = (cart[indice].cantidad * cart[indice].price),//ACTUAZAMOS EL PRECIO EN FUNCION
                      cart[indice].total    = (cart[indice].subtotal)
                      break;                   //ROMPEMOS LA CICLO  
                  case 'remove':
                      cart[indice].cantidad--; //LE SUMAMOS LA CANTIDAD
                      cart[indice].subtotal = (cart[indice].cantidad * cart[indice].price),//ACTUAZAMOS EL PRECIO EN FUNCION
                      cart[indice].total    = (cart[indice].subtotal)
                      if(cart[indice].cantidad < 1){
                          cart.splice(indice , 1);
                      }
                      break;                   //ROMPEMOS LA CICLO  
                  case 'clear':
                      cart.splice(indice , 1);
                      if(cart.length === 0){
                          delete req.session.cart;
                      }                 
                      break;
                  default : console.log('Update Problem');
                      break;
              }
              break;
          }
      }
      req.flash("success", "cart Update :)");
      res.redirect('/product/cart/checkout');
  } catch (error) {
      console.error(error);
  }
}

cartController.clearCart = (req, res) => {
    try {
      delete req.session.cart;
      req.flash('success' , 'Cart Cleared!....');
      res.redirect('/product/cart/checkout');
    } catch (error) {
      console.log(error);
    }
}



module.exports = cartController;