const CategoryModel = require('./categories.model');
const { body, validationResult } = require('express-validator');

exports.getAllCategories = async (req, res) => {
    const categories = await CategoryModel.find({}).populate('products').sort({ name: 1 });
    res.status(200).json(categories);
}

exports.getOneCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id).populate('products');
        res.status(200).json(category);   
    } catch (error) {
        res.status(404).json({ error: 'Category not available' });   
    }
}

exports.addCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newCategory = await CategoryModel.create(req.body);
    res.status(201).json(newCategory);
}

exports.editCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let queryRes;
    const category = req.body;
    try {
        queryRes = await CategoryModel.findById(req.params.id).updateOne(category);
    } catch (error) {
        res.status(404).json({ error: 'Category not available' });
    }
    if (!queryRes.nModified) {
        res.status(404).json({ error: 'Category not available' });
    } else {
        res.status(200).json(await CategoryModel.findById(req.params.id));
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await CategoryModel.findById(req.params.id).deleteOne();
        res.status(204).json({});
    } catch (error) {
        res.status(404).json({ error: 'Category not available' });
    }
}