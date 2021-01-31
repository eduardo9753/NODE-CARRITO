const { Schema, model } = require('mongoose');

//MODEL PAGE
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

module.exports = model('Category', CategorySchema);