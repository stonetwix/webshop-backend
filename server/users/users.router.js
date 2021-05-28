const express = require('express'); 
const usersRouter = express.Router(); 
const controller = require('./users.controller'); 
const { body, validationResult } = require('express-validator'); 

usersRouter
    .get('/api/users', controller.getOneUser)
    .post('/api/users', 
        body('email').isEmail().normalizeEmail(),
        body('password').not().isEmpty(),
        body('role').not().isEmpty(),
        controller.addUser)
    .post('/api/login',
        body('email').isEmail().normalizeEmail(),
        body('password').not().isEmpty(),
        controller.userLogin)
    .delete('/api/logout', controller.userLogout)
    .get('/api/whoami', controller.whoami)

module.exports = usersRouter;



