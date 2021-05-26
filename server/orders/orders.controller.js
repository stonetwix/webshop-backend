const OrderModel = require('./orders.model');
const OrderProductModel = require('./orderProducts.model');
const ProductModel = require('../products/products.model');
const { body, validationResult } = require('express-validator');
const DeliveryModel = require('../deliveryMethods/delivery.model');
const UserModel = require('../users/users.model');

exports.getAllOrders = async (req, res) => {
    const orders = await OrderModel.find({}).populate('orderProducts').populate('deliveryMethod').populate('user');
    res.status(200).json(orders);
}

exports.getOneOrder = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id).populate('orderProducts').populate('deliveryMethod').populate('user');
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ error: 'Order not available' });
    }
}

exports.addOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const cartProducts = req.body.cartProducts;
    const productIds = cartProducts.map(p => p.product._id);
    const filter = {
        _id: { $in: productIds }
    }
    const products = await ProductModel.find(filter);
    const productMap = Object.fromEntries(products.map(p => [p._id, p]));

    const orderProductsData = cartProducts.map(p => ({
        title: productMap[p.product._id]['title'],
        price: productMap[p.product._id]['price'],
        originalProductID: productMap[p.product._id]['_id'],
        quantity: p.quantity,
        totalPrice: productMap[p.product._id]['price'] * p.quantity,
    }));

    //Checks if products inventory is more than quantity. 
    const allProductsAvailable = orderProductsData.map(p => productMap[p.originalProductID]['inventory'] >= p.quantity).every(x => x === true);
    console.log('allProductsAvailable: ', allProductsAvailable);
    if (!allProductsAvailable) {
        res.status(400).json({ error: 'Product inventory too low' });
        return;
    }

    //Checks if product prices has changed?? – NOT TESTED!!!
    const productsPrice = orderProductsData.map(p => productMap[p.originalProductID]['price'] === p.price).every(x => x === true);
    if (!productsPrice) {
        res.status(400).json({ error: 'Product price has changed, check your updated cart' });
        return;
    }

    const orderProducts = await OrderProductModel.create(orderProductsData);

    for (const cartProduct of cartProducts) {
        const productId = cartProduct.product._id;
        await ProductModel.findById(productId).updateOne({ inventory: productMap[productId].inventory - cartProduct.quantity })
    }

    const deliveryMethod = await DeliveryModel.findById(req.body.deliveryMethod._id);
    const deliveryDay = calculateDeliveryDay(deliveryMethod.deliverytime);
    const user = await UserModel.findOne({ email: req.session.email });
    console.log(user)
    const orderData = {
        orderProducts: orderProducts,
        deliveryMethod: deliveryMethod,
        totalPrice: orderProducts.reduce((acc, p) => acc + p.totalPrice, 0),
        user: user,
        deliveryInformation: req.body.deliveryInformation,
        deliveryDay: deliveryDay,
        isShipped: false,
    }
    const newOrder = await OrderModel.create(orderData);
    res.status(201).json(newOrder);
}

//Helper function that calculates the delivery day
function calculateDeliveryDay (timeInHours) {
    const today = new Date();
    const deliveryDay = new Date(today);
    deliveryDay.setDate(deliveryDay.getDate() + timeInHours / 24);
    return deliveryDay.toISOString().split('T')[0];
}