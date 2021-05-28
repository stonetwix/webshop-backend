const express = require('express');
const ordersRouter = express.Router();
const controller = require('./orders.controller');
const { body, validationResult } = require('express-validator');
const auth = require('../auth');

ordersRouter
    .get('/api/orders', 
        auth.secureWithAdmin,
        controller.getAllOrders)
    .get('/api/orders/:id', 
        auth.secureWithAdmin,
        controller.getOneOrder)
    .post('/api/orders', 
        body('deliveryMethod').not().isEmpty(),
        body('totalPrice').not().isEmpty(),
        body('deliveryInformation').not().isEmpty(),
        body('deliveryDay').not().isEmpty(),
        body('isShipped').not().isEmpty(),
        controller.addOrder)
    .put('/api/orders/:id/isShipped', 
        auth.secureWithAdmin,    
        controller.editOrder);


module.exports = ordersRouter;