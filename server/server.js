
const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const cookieSession = require('cookie-session');
const productsRouter = require('./products/products.router');
//const fs = require('fs');

const app = express();
const port = 3001;

const { body, validationResult } = require('express-validator');

app.use(express.json());
app.use(cookieSession({
    name: 'session',
    secret: 'aVeryS3cr3tK3y',
    secure: false,
    maxAge: 1000 * 3600 * 24,
    httpOnly: true
}));
app.use(productsRouter);

//Start server
async function run() {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/fashionstore', 
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log('Database is connected');
    } catch (error) {
        console.error(error)
    }
    app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));
}
run();

//Helper functions to read/write from/to JSON
function readProducts() {
    let rawdata = fs.readFileSync('products.json');
    return JSON.parse(rawdata);
}

function writeProducts(products) {
    let data = JSON.stringify(products);
    fs.writeFileSync('products.json', data);
}