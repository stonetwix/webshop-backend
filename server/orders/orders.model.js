const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderProducts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'OrderProduct'
    }],
    deliveryMethod: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DeliveryMethod'
    },
    totalPrice: { type: Number, required: true },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    deliveryInformation: { type: Object, required: true },
    deliveryDay: { type: String, required: true },
    isShipped: { type: Boolean, required: true },
},
    { timestamps: true },
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;