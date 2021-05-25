const DeliveryModel = require('./delivery.model');
const { validationResult } = require('express-validator');

exports.getAllDeliveryMethods = async (req, res) => {
    const deliveryMethods = await DeliveryModel.find({});
    res.status(200).json(deliveryMethods);
}

exports.getOneDeliveryMethod = async (req, res) => {
    try {
        const deliveryMethod = await DeliveryModel.findById(req.params.id);
        res.status(200).json(deliveryMethod);   
    } catch (error) {
        res.status(404).json({ error: 'Delivery method not available' });   
    }
}

exports.addDelivery = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newDelivery = await DeliveryModel.create(req.body);;
    res.status(201).json(newDelivery);
}

