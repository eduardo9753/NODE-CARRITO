const { Schema, model } = require("mongoose");

//MODEL PAGE
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {//RELACION CON MODEL CATEGORY
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: { //NOMBRE DE LA IMAGEN
    type: String,
  },
  path: { //RUTA QUE VA RECORRER LA IMAGEN
    type: String
  },
});

module.exports = model("Product", ProductSchema);
