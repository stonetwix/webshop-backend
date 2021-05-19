const DeliveryModel = require('./delivery.model');
const { validationResult } = require('express-validator');

exports.getAllDeliveryMethods = async (req, res) => {
    const deliveryMethods = await DeliveryModel.find({});
    res.status(200).json(deliveryMethods);
}

exports.getOneDeliveryMethod = async (req, res) => {
    try {
        const product = await DeliveryModel.findById(req.params.id);
        res.status(200).json(deliveryMethods);   
    } catch (error) {
        res.status(404).json({ error: 'Delivery method not available' });   
    }
}

