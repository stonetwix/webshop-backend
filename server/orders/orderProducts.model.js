const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    originalProductId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }

});

const OrderProductModel = mongoose.model('OrderProduct', orderProductSchema);

module.exports = OrderProductModel;