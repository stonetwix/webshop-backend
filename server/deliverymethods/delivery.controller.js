const DeliveryModel = require('./delivery.model');
const { validationResult } = require('express-validator');

exports.getAllDeliveryMethods = async (req, res) => {
    //Sort on hours
    const deliveryMethods = await DeliveryModel.find({});
    const deliveryMethodsWithDay = deliveryMethods.map(d => ({
        ...d.toObject(), 
        deliveryDay: calculateDeliveryDay(d.deliverytime)
    }))
    res.status(200).json(deliveryMethodsWithDay);
}

// exports.getOneDeliveryMethod = async (req, res) => {
//     try {
//         const deliveryMethod = await DeliveryModel.findById(req.params.id);
//         res.status(200).json(deliveryMethod);   
//     } catch (error) {
//         res.status(404).json({ error: 'Delivery method not available' });   
//     }
// }

// exports.addDelivery = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const newDelivery = await DeliveryModel.create(req.body);;
//     res.status(201).json(newDelivery);
// }

function calculateDeliveryDay(timeInHours) {
    const today = new Date();
    const deliveryDay = new Date(today);
    deliveryDay.setDate(deliveryDay.getDate() + timeInHours / 24);
    return deliveryDay.toISOString().split('T')[0];
  }

