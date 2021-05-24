const OrderModel = require('./orders.model');
const OrderProductModel = require('./orderProducts.model');
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
    // TODO: Validering kollar om varan är slut eller om priset ändrats
    // [{_id: '...', quantity: 2, price: 1111}]
    const cartProucts = req.body.cartProducts;
    const products = await ProductModel.findById(cartProucts.map(p => p._id));
    const productMap = Objects.fromEntries(products.map(p => [p._id, p]));
    const orderProductsData = cartProucts.map(p => ({
        title: productMap[p.id]['title'],
        price: productMap[p.id]['price'],
        originalProductID: productMap[p.id]['_id'],
        quantity: p.quantity,
    }));

    // const orderProductData = {
    //     title: 'Dress',
    //     price: 300,
    //     originalProductID: '60a8b9b64a964c6c9d5b8dd9',
    //     quantity: 1,
    // };
    const orderProduct = await OrderProductModel.create(orderProductData);

    const orderData = {
        orderProducts: [orderProduct._id],
        deliveryMethod: 'Frakt',
        totalPrice: 22,
        //user: ,
        deliveryAddress: [],
        deliveryDay: '2021-06-01',
        isShipped: false,
    }
    const newOrder = await OrderModel.create(orderData);
    res.status(201).json(newOrder);
}