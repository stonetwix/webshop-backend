const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    company: { type: String, required: true },
    price: { type: Number, required: true },
    deliverytime: { type: Number, required: true }
});

const DeliveryModel = mongoose.model('DeliveryMethod', deliverySchema);

module.exports = DeliveryModel;