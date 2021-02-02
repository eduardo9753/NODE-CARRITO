const indexController = {};

//MODEL CATEGORIE
const Category = require('../models/Category');
const Products = require('../models/Products');

indexController.index =  (req , res) => {
   try {
      res.render('index.hbs' , {Pagina : 'Home'});
   } catch (error) {
     console.error(error);  
   }
}

indexController.allProducts = async (req , res) => {
   try {
      let verPorPagina = 9;
      let pagina = req.params.page || 1;
      const categories = await Category.find({}).lean();
      const products   = await Products.find({}).lean()
                                                .skip((pagina - 1)* verPorPagina)
                                                .limit(verPorPagina).exec();
      let total = await Products.count();
      console.log('CATEGORY INDEX: ', categories);
      console.log('PRODUCTS INDEX: ', products);
      let Pagina = 'All Product';
      const viewModel = {
         categories :categories,
         products   : products,
         current    : pagina,
         paginas    : Math.ceil(total / verPorPagina),
         Pagina ,
      };
      res.render('allProduct.hbs' , viewModel);
   } catch (error) {
      console.log(error);
   }
}

indexController.productsByCategory = async (req , res) => {
   try {
      const slug = req.params.slug;
      console.log('ID SLUG: ',slug);
      let verPorPagina = 9;
      let pagina = req.params.page || 1;
      const categories = await Category.find({}).lean();//PARA PINTAR LAS CATEGORIAS "li>a"
      const products   = await Products.find({ category :slug }).lean()
                                       .skip((pagina - 1)* verPorPagina)
                                       .limit(verPorPagina)
                                       .exec();//PARA QUE ME FILTA POR CATEGORIA
      let total = await Products.count();
      let Pagina = 'Product By Category'
      const viewModel = {
         categories : categories, 
         products   : products,
         current    : pagina,
         paginas    : Math.ceil(total / verPorPagina),
         Pagina ,
      };
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
      let Pagina = 'Tu Producto'
      const viewModel = {product,Pagina};
      console.log('DATA PRODUCT VIEW:' , product);
      res.render('productView.hbs' , viewModel);
   } catch (error) {
      console.error(error);
   }
}

//EXPORTAMOS
module.exports = indexController;