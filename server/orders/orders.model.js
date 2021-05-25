const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderProducts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'OrderProduct'
    }],
    deliveryMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    //TODO: Add User
    //user: { type: mongoose.Schema.Types.ObjectId, required: true },
    deliveryInformation: { type: Object, required: true },
    deliveryDay: { type: String, required: true },
    isShipped: { type: Boolean, required: true },
},
    { timestamps: true },
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;