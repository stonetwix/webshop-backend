const express = require('express');
const categoriesRouter = express.Router();
const controller = require('./categories.controller');
const { body, validationResult } = require('express-validator');

categoriesRouter
    .get('/api/categories', controller.getAllCategories)
    .get('/api/categories/:id', controller.getOneCategory)
    .post('/api/categories',
        body('name').not().isEmpty(),
        //body('products').not().isEmpty(),
        controller.addCategory)
    .put('/api/categories/:id',
        body('name').not().isEmpty(),
        //body('products').not().isEmpty(),
        controller.editCategory)
    .delete('/api/categories/:id', controller.deleteCategory);

module.exports = categoriesRouter;