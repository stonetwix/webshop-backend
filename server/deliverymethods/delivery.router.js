const express = require('express');
const deliveryRouter = express.Router();
const controller = require('./delivery.controller');
// const { body, validationResult } = require('express-validator');

deliveryRouter
    .get('/api/delivery', controller.getAllDeliveryMethods)
    .get('/api/delivery/:id', controller.getOneDeliveryMethod)

module.exports = deliveryRouter;