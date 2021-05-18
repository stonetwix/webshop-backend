const express = require('express');
const productsRouter = express.Router();
const ProductModel = require('./products.model');
const { body, validationResult } = require('express-validator');

productsRouter.get('/api/products', async (req, res) => {
    const products = await ProductModel.find({});
    res.status(200).json(products);
});

productsRouter.get('/api/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.find(req.params.id);
        res.status(200).json(product);   
    } catch (error) {
        res.status(404).json({ error: 'Product not available' });   
    }
});

productsRouter.post('/api/products',
    body('title').not().isEmpty(),
    body('description').not().isEmpty(),
    body('price').not().isEmpty(),
    body('imageUrl').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newProduct = await ProductModel.create(req.body);;
        res.status(201).json(newProduct);
});

productsRouter.put('/api/products/:id',
    body('title').not().isEmpty(),
    body('description').not().isEmpty(),
    body('price').not().isEmpty(),
    body('imageUrl').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const product = await ProductModel.findById(req.params.id).updateOne(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ error: 'Product not available' });
        }
    }
);

productsRouter.delete('/api/products/:id', async (req, res) => {
    try {
        await PostModel.findById(req.params.id).deleteOne();
        res.status(204).json({});
    } catch (error) {
        res.status(404).json({ error: 'Product not available' });
    }
});

module.exports = productsRouter;