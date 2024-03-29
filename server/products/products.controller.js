const ProductModel = require('./products.model');
const { body, validationResult } = require('express-validator');
const multer  = require('multer');
const upload = multer({ dest: 'static/img/' });

exports.getAllProducts = async (req, res) => {
    let filter = {};
    if (req.query.category) {
        filter = {
            categories: { $in: req.query.category }
        }
    }
    const products = await ProductModel.find(filter).populate('categories').sort({ title: 1 });
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
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
}

exports.uploadImg = async (req, res) => {
    res.status(201).json({ path: '/' + req.file.path });
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
        return;
    }
    if (!queryRes.nModified) {
        res.status(404).json({ error: 'Product not available' });
    } else {
        res.status(200).json(await ProductModel.findById(req.params.id));
    }
}

exports.deleteProduct = async (req, res) => {
    let queryRes;
    try {
        queryRes = await ProductModel.findById(req.params.id).deleteOne();
    } catch (error) {
        res.status(404).json({ error: 'Product not available' });
        return;
    }
    if (!queryRes.deletedCount) {
        res.status(404).json({ error: 'Product not available' });
    } else {
        res.status(204).json({});
    }
}