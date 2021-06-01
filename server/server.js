
const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const cookieSession = require('cookie-session');
const productsRouter = require('./products/products.router');
const usersRouter = require('./users/users.router'); 
const deliveryRouter = require('./deliveryMethods/delivery.router');
const categoriesRouter = require('./categories/categories.router');
const ordersRouter = require('./orders/orders.router');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieSession({
    name: 'session',
    secret: 'aVeryS3cr3tK3y',
    secure: false,
    maxAge: 1000 * 3600 * 24,
    httpOnly: true
}));
app.use(productsRouter);
app.use(usersRouter); 
app.use(deliveryRouter);
app.use(categoriesRouter);
app.use(ordersRouter);
app.use('/static', express.static('static'));

//error handler
app.use((err, req, res, next) => {
    const message = err.message || 'Something went wrong...';
    const statusCode = err.status || 500;
    res.status(statusCode).json({ message });
})

//404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Resource could not be found.' });
})

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