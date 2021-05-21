const ProductModel = require('./products.model');
const { body, validationResult } = require('express-validator');

exports.getAllProducts = async (req, res) => {
    const products = await ProductModel.find({});
    res.status(200).json(products);
}

exports.getOneProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product);   
    } catch (error) {
        res.status(404).json({ error: 'Product not available' });   
    }
}

exports.addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newProduct = await (await ProductModel.create(req.body));
    res.status(201).json(newProduct);
}

exports.editProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let queryRes;
    const product = req.body;
    try {
        queryRes = await ProductModel.findById(req.params.id).updateOne(product);
    } catch (error) {
        res.status(404).json({ error: 'Product not available' });
    }
    if (!queryRes.nModified) {
        res.status(404).json({ error: 'Product not available' });
    } else {
        res.status(200).json(await ProductModel.findById(req.params.id));
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await ProductModel.findById(req.params.id).deleteOne();
        res.status(204).json({});
    } catch (error) {
        res.status(404).json({ error: 'Product not available' });
    }
}