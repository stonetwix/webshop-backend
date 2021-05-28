const express = require('express');
const productsRouter = express.Router();
const controller = require('./products.controller');
const { body, validationResult } = require('express-validator');
const auth = require('../auth');

productsRouter
    .get('/api/products', controller.getAllProducts)
    .get('/api/products/:id', controller.getOneProduct)
    .get('/api/products/category/:id', controller.getProductsByCategory)
    .post('/api/products',
        auth.secureWithAdmin,
        body('title').not().isEmpty(),
        body('description').not().isEmpty(),
        body('price').not().isEmpty(),
        body('imageUrl').not().isEmpty(),
        body('inventory').not().isEmpty(),
        controller.addProduct)
    .put('/api/products/:id',
        auth.secureWithAdmin,
        body('title').not().isEmpty(),
        body('description').not().isEmpty(),
        body('price').not().isEmpty(),
        body('imageUrl').not().isEmpty(),
        body('inventory').not().isEmpty(),
        controller.editProduct)
    .delete('/api/products/:id', 
        auth.secureWithAdmin,
        controller.deleteProduct);

module.exports = productsRouter;