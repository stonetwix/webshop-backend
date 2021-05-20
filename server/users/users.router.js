const express = require('express'); 
const usersRouter = express.Router(); 
const controller = require('./users.controller'); 
const { body, validationResult } = require('express-validator'); 

usersRouter
    .get('/api/users', controller.getOneUser)
    .post('/api/users', 
    body('email').isEmail().normalizeEmail(),
    body('password').not().isEmpty(),
    controller.addUser); 

module.exports = usersRouter; 
 
