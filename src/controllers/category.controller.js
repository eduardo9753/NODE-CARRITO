const categoryController = {};

//MODEL CATEGORY
const Category = require('../models/Category');


categoryController.index = async (req, res) => {
  try {
    const dataCategory = await Category.find({}).lean();
    console.log('DATA CATEGORY DB:' , dataCategory);
    let Page = 'Categories';
    const modeView = { dataCategory , Page };
    res.render('category/category.hbs' , modeView);
  } catch (error) {
    console.error(error);
  }
}

categoryController.form = (req , res) => {
    res.render('category/add.hbs' , { Page : 'Form Categories' });
}

categoryController.formAdd = async (req , res) => {
  try {
    const categories = new Category();
    categories.title = req.body.title;
    categories.slug  = req.body.title.toLowerCase();
    const result     = await categories.save();
    if(result){
        req.flash('success' , 'Correcto :)');
        res.redirect('/category/categories');
    }else{
        req.flash('error' , 'Error :(');
        res.redirect('/category/categories');
    }
  } catch (error) {
    console.error(error);
  }
}


categoryController.edit = async (req , res) => {
  try {
    const id = req.params.id;
    console.log('ID EDIT CATEGORY:' , id);
    const dataEdit = await Category.findOne( {_id : id }).lean();
    res.render('category/edit.hbs' , { dataEdit : dataEdit });
  } catch (error) {
    console.error(error);
  }
   
 }
 
 categoryController.update = async (req, res) => {
  try {
    const id = req.params.id;
          let title = req.body.title;
          let slug  = req.body.title.toLowerCase();
    const correct   = await Category.findByIdAndUpdate(id , {
          title : title,
          slug  : slug,
     });
     if(correct){
       req.flash('success' , 'Correcto :)');
       res.redirect('/category/categories');
     }else{
       req.flash('error' , 'Hubo un error en la Actualizacion');
       res.render('/category/categories');
     }
  } catch (error) {
    console.error(error);
  }
    
 }
 
 categoryController.delete = async (req , res) => {
  try {
    const id = req.params.id;
    console.log('ID DELETE CATEGORY:' , id);
    const drop = await Category.findByIdAndDelete({_id : id });
    if(drop){
      req.flash('success' , 'Correcto Delete :)');
      res.redirect('/category/categories');
    }else{
      req.flash('error' , 'Hubo un error en la Eiminacion');
      res.redirect('/category/categories')
    }
  } catch (error) {
    console.error(error);
  }
 }

module.exports = categoryController;

