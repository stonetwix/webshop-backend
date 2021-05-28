const express = require('express');
const categoriesRouter = express.Router();
const controller = require('./categories.controller');
const { body, validationResult } = require('express-validator');
const auth = require('../auth');

categoriesRouter
    .get('/api/categories', controller.getAllCategories)
    .get('/api/categories/:id', controller.getOneCategory)
    .post('/api/categories',
        auth.secureWithAdmin,
        body('name').not().isEmpty(),
        controller.addCategory)
    .put('/api/categories/:id',
        auth.secureWithAdmin,
        body('name').not().isEmpty(),
        controller.editCategory)
    .delete('/api/categories/:id', 
        auth.secureWithAdmin,    
        controller.deleteCategory);

module.exports = categoriesRouter;