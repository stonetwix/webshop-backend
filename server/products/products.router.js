const express = require('express');
const productsRouter = express.Router();
const controller = require('./products.controller');
const { body, validationResult } = require('express-validator');

productsRouter
    .get('/api/products', controller.getAllProducts)
    .get('/api/products/:id', controller.getOneProduct)
    .get('/api/products/:id', controller.getProductsByCategory)
    .post('/api/products',
        body('title').not().isEmpty(),
        body('description').not().isEmpty(),
        body('price').not().isEmpty(),
        body('imageUrl').not().isEmpty(),
        controller.addProduct)
    .put('/api/products/:id',
        body('title').not().isEmpty(),
        body('description').not().isEmpty(),
        body('price').not().isEmpty(),
        body('imageUrl').not().isEmpty(),
        controller.editProduct)
    .delete('/api/products/:id', controller.deleteProduct);

module.exports = productsRouter;