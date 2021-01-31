const pathUpdate = require("path");
const pathDelete = require("path");
const { unlink } = require("fs-extra");

const productController = {};

//MODEL CATEGORY
const Product = require("../models/Products");
const Category = require("../models/Category");


productController.index = async (req, res) => {
  try {
    const dataProduct = await Product.find({}).lean();
    console.log("DATA PRODUCTS :", dataProduct);
    let Page = 'home';
    const viewModel = {Page ,dataProduct };
    res.render("product/product.hbs", viewModel);
  } catch (error) {
    console.error(error);
  }
};

productController.form = async (req, res) => {
  try {
    const dataCategory = await Category.find({}).lean();
    let Page = 'Form Product'
    const viewModel = {Page , dataCategory};
    res.render("product/add.hbs", viewModel);
  } catch (error) {
    console.error(error);
  }
};

productController.formAdd = async (req, res) => {
  try {
    console.log("DATA BODY: ", req.body);
    console.log("DATA FILE: ", req.file);
    const product    = new Product();
    product.title    = req.body.title;
    product.slug     = req.body.title.toLowerCase();
    product.desc     = req.body.description;
    product.category = req.body.category;
    product.price    = parseFloat(req.body.price).toFixed(2);
    product.image    = req.file.originalname;
    product.path     = "products/" + req.file.filename; //RUTA DE LA IMAGEN RECORREMOS CON FOR Y MOSTRAMOS LA RUTA
    const correct    = await product.save();
    if (correct) {
      req.flash("success", "Correcto :)");
      res.redirect("/product/products");
    } else {
      req.flash("error", "Incorrecto :(");
      res.redirect("/product/products");
    }
  } catch (error) {
    console.error(error);
  }
};

productController.edit = async (req, res) => {
  try {
    const id           = req.params.id;
    const dataEdit     = await Product.findById({ _id: id }).lean();
    const dataCategory = await Category.find({}).lean();
    console.log("DATA EDIT : ", dataEdit);
    let Page = 'Edit Product'
    const viewModel = {dataEdit ,dataCategory , Page};
    res.render("product/edit.hbs", viewModel);
  } catch (error) {
    console.error(error);
  }
};

productController.update = async (req, res) => {
  const id = req.params.id;
  console.log("DATA BODY:", req.body);
  console.log("DATA FILE:", req.file);
  try {
    if (typeof req.file !== 'undefined') { //SI ES QUE SE ABRIO UNA FOTO NUEVA PARA SUBIR
      let title    = req.body.title;
      let slug     = req.body.title.toLowerCase();
      let desc     = req.body.description;
      let category = req.body.category;
      let price    = parseFloat(req.body.price).toFixed(2);
      let image    = req.file.originalname;
      let path     = "products/" + req.file.filename; //RUTA DE LA IMAGEN RECORREMOS CON FOR Y MOSTRAMOS LA RUTA
      const producto = await Product.findByIdAndUpdate(id, {
        title    : title,
        slug     : slug,
        desc     : desc,
        category : category,
        price    : price,
        image    : image ,
        path     : path,
      });
      if (producto) {
        await unlink(pathUpdate.resolve("./src/public/" + producto.path));
        req.flash("success", "Correcto Update :)");
        res.redirect("/product/products");
      } else {
        req.flash("error", "Incorrecto Update :(");
        res.redirect("/product/products");
      }
    }else  if(typeof req.file === 'undefined'){
      const product = await Product.findById({_id : id});
      console.log('DATA PRODUCT UPDATE : ' , product);
      let title    = req.body.title;
      let slug     = req.body.title.toLowerCase();
      let desc     = req.body.description;
      let category = req.body.category;
      let price    = parseFloat(req.body.price).toFixed(2);
      let image    = product.image;
      let path     = product.path; //RUTA DE LA IMAGEN RECORREMOS CON FOR Y MOSTRAMOS LA RUTA
      const update = await Product.findByIdAndUpdate(id, {
        title    : title,
        slug     : slug,
        desc     : desc,
        category : category,
        price    : price,
        image    : image ,
        path     : path,
      });
      if(update){
        req.flash("success", "Correcto Update :)");
        res.redirect("/product/products");
      } else {
        req.flash("error", "Incorrecto Update :(");
        res.redirect("/product/products");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

productController.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await Product.findByIdAndDelete({ _id: id });
    if (producto) {
       console.log("producto delete: ", producto.path);
       await unlink(pathDelete.resolve("./src/public/" + producto.path));
       req.flash("success", "Correcto Delete :)");
       res.redirect("/product/products");
    } else {
       req.flash("error", "Incorrecto Delete :(");
       res.redirect("/product/products");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = productController;
