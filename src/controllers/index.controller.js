const indexController = {};

//MODEL CATEGORIE
const Category = require('../models/Category');
const Products = require('../models/Products');

indexController.index =  (req , res) => {
   try {
      res.render('index.hbs');
   } catch (error) {
     console.error(error);  
   }
}

indexController.allProducts = async (req , res) => {
   try {
      const categories = await Category.find({}).lean();
      const products   = await Products.find({}).lean();
      console.log('CATEGORY INDEX: ', categories);
      console.log('PRODUCTS INDEX: ', products);
      let Page = 'All Product';
      const viewModel = {categories , products , Page};
      res.render('allProduct.hbs' , viewModel);
   } catch (error) {
      
   }
}

indexController.productsByCategory = async (req , res) => {
   try {
      const slug = req.params.slug;
      console.log('ID SLUG: ',slug);
      const categories = await Category.find({}).lean();//PARA PINTAR LAS CATEGORIAS "li>a"
      const products   = await Products.find({ category :slug }).lean();//PARA QUE ME FILTA POR CATEGORIA
      let Page = 'Product By Category'
      const viewModel = {products , categories , Page};
      console.log('DATA PRODUCT BY CATEGORY: ' , categories);
      res.render('categoryProduct.hbs' , viewModel);
   } catch (error) {
      console.log(error);
   }  
}


indexController.productsView = async (req , res) => {
   try {
      const id = req.params.id;
      const product = await Products.findById({ _id : id}).lean();
      let Page = 'Tu Producto'
      const viewModel = {product,Page};
      console.log('DATA PRODUCT VIEW:' , product);
      res.render('productView.hbs' , viewModel);
   } catch (error) {
      console.error(error);
   }
}

//EXPORTAMOS
module.exports = indexController;