const express = require('express');
const ordersRouter = express.Router();
const controller = require('./orders.controller');
const { body, validationResult } = require('express-validator');

ordersRouter
    .get('/api/orders', controller.getAllOrders)
    .get('/api/user-orders', controller.getUserOrders)
    .get('/api/orders/:id', controller.getOneOrder)
    .post('/api/orders', controller.addOrder);


module.exports = ordersRouter;