const express = require('express');
const productsRouter = express.Router();
const controller = require('./products.controller');
const { body, validationResult } = require('express-validator');
const auth = require('../auth');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png') // TODO: Fix
    }
})
   
const upload = multer({ storage: storage });

productsRouter
    .get('/api/products', controller.getAllProducts)
    .get('/api/products/:id', controller.getOneProduct)
    .post('/api/products',
        auth.secureWithAdmin,
        body('title').not().isEmpty(),
        body('description').not().isEmpty(),
        body('price').not().isEmpty(),
        body('imageUrl').not().isEmpty(),
        body('inventory').not().isEmpty(),
        controller.addProduct)
    .post('/api/upload',
        auth.secureWithAdmin, //TODO: Make sure it works!!
        upload.single('photo'),
        controller.uploadImg)
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