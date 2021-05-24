const OrderModel = require('./orders.model');
const OrderProductModel = require('./orderProducts.model');
const ProductModel = require('../products/products.model');
const { body, validationResult } = require('express-validator');

exports.getAllOrders = async (req, res) => {
    const orders = await OrderModel.find({}).populate('orderProducts');
    res.status(200).json(orders);
}

exports.getOneOrder = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ error: 'Order not available' });
    }
}

exports.addOrder = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    // TODO: Validering kollar om priset ändrats

    const cartProducts = req.body.cartProducts;
    const productIds = cartProducts.map(p => p._id);
    const filter = {
        _id: { $in: productIds }
    }
    const products = await ProductModel.find(filter);
    const productMap = Object.fromEntries(products.map(p => [p._id, p]));

    const orderProductsData = cartProducts.map(p => ({
        title: productMap[p._id]['title'],
        price: productMap[p._id]['price'],
        originalProductID: productMap[p._id]['_id'],
        quantity: p.quantity,
        totalPrice: productMap[p._id]['price'] * p.quantity,
    }));

    //Checks if products inventory is more than quantity. 
    const allProductsAvailable = orderProductsData.map(p => productMap[p.originalProductID]['inventory'] >= p.quantity).every(x => x === true);
    if (!allProductsAvailable) {
        res.status(400).json({ error: 'Product inventory too low' });
        return;
    }

    //Checks if products price has changed????????
    const productsPrice = orderProductsData.map(p => productMap[p.originalProductID]['price'] === p.price).every(x => x === true);
    if (!productsPrice) {
        res.status(400).json({ error: 'Product price has changed, check your updated cart' });
        return;
    }

    const orderProducts = await OrderProductModel.create(orderProductsData);

    for (const cartProduct of cartProducts) {
        const productId = cartProduct._id;
        await ProductModel.findById(productId).updateOne({ inventory: productMap[productId].inventory - cartProduct.quantity})
    }

    const orderData = {
        orderProducts: orderProducts.map(p => p._id),
        deliveryMethod: req.body.deliveryMethod,
        totalPrice: orderProducts.reduce((acc, p) => acc + p.totalPrice, 0),
        //user: ,
        deliveryAddress: req.body.deliveryAddress,
        deliveryDay: '2021-06-01',
        isShipped: false,
    }
    const newOrder = await OrderModel.create(orderData);
    res.status(201).json(newOrder);
}