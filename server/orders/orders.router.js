const express = require('express');
const ordersRouter = express.Router();
const controller = require('./orders.controller');
const { body, validationResult } = require('express-validator');
const auth = require('../auth');

ordersRouter
    .get('/api/orders', 
        auth.secure,
        controller.getAllOrders)
    .get('/api/orders/:id', 
        auth.secure,
        controller.getOneOrder)
    .post('/api/orders', 
        auth.secure,
        body('deliveryMethod').not().isEmpty(),
        body('cartProducts').not().isEmpty(),
        body('deliveryInformation').not().isEmpty(),
        controller.addOrder)
    .put('/api/orders/:id/isShipped', 
        auth.secureWithAdmin,
        body('isShipped').isBoolean(),
        controller.editOrder);

module.exports = ordersRouter;