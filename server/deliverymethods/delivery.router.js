const express = require('express');
const deliveryRouter = express.Router();
const controller = require('./delivery.controller');
const { body, validationResult } = require('express-validator');

deliveryRouter
    .get('/api/delivery', controller.getAllDeliveryMethods)
    // .get('/api/delivery/:id', controller.getOneDeliveryMethod)
    // .post('/api/delivery',
    //     body('company').not().isEmpty(),
    //     body('price').not().isEmpty(),
    //     body('deliverytime').not().isEmpty(),
    //     controller.addDelivery);

module.exports = deliveryRouter;