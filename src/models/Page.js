const { Schema, model } = require('mongoose');

//MODEL PAGE
const PageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sorting: {
        type: Number
    }
});

module.exports = model('Page', PageSchema);