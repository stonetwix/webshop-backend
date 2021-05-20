const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
    //products: { type: Array, }
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;