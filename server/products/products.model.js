const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    categories:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
    inventory: { type: Number, required: true }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;