const DeliveryModel = require('./delivery.model');

exports.getAllDeliveryMethods = async (req, res) => {
    const deliveryMethods = await DeliveryModel.find({}).sort({'deliverytime': 'asc'});
    const deliveryMethodsWithDay = deliveryMethods.map(d => ({
        ...d.toObject(), 
        deliveryDay: calculateDeliveryDay(d.deliverytime)
    }))
    res.status(200).json(deliveryMethodsWithDay);
}

function calculateDeliveryDay(timeInHours) {
    const today = new Date();
    const deliveryDay = new Date(today);
    deliveryDay.setDate(deliveryDay.getDate() + timeInHours / 24);
    return deliveryDay.toISOString().split('T')[0];
}

