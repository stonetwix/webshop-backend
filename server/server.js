
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

const { body, validationResult } = require('express-validator');

app.use(cors());
app.use(express.json());

// Endpoints
app.route('/products')
.get((req, res) => {  
    res.status(200).json(readProducts());
})
.post( 
    body('title').not().isEmpty(),
    body('description').not().isEmpty(),
    body('price').not().isEmpty(),
    body('imageUrl').not().isEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const products = readProducts();
        const newProduct = req.body;
        newProduct.id = Math.max(...products.map((item) => item.id)) + 1;
        products.push(newProduct);
        writeProducts(products);
        res.status(201).json(newProduct);
});

app.route('/products/:id')
.get((req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === Number(req.params.id));
    if (!product) {
        res.status(404).json({ error: 'Product not available' });
    }
    res.status(200).json(product);
})
.put( 
    body('title').not().isEmpty(),
    body('description').not().isEmpty(),
    body('price').not().isEmpty(),
    body('imageUrl').not().isEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let products = readProducts();
        const product = req.body;
        const id = Number(req.params.id);
        product.id = id;
        products = products.map((item) => item.id === id ? product : item);
        writeProducts(products);
        res.status(200).json(req.body);
})
.delete((req, res) => {
    let products = readProducts();
    products = products.filter((item) => item.id !== Number(req.params.id));
    writeProducts(products);
    res.status(204).json({});
});

//Start server
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

//Helper functions to read/write from/to JSON
function readProducts() {
    let rawdata = fs.readFileSync('products.json');
    return JSON.parse(rawdata);
}

function writeProducts(products) {
    let data = JSON.stringify(products);
    fs.writeFileSync('products.json', data);
}