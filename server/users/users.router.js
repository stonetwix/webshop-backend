const express = require('express'); 
const usersRouter = express.Router(); 
const controller = require('./users.controller'); 
const { body, validationResult } = require('express-validator'); 
const auth = require('../auth');

usersRouter
    .get('/api/users', 
        auth.secureWithAdmin,
        controller.getOneUser)
    .get('/api/users/adminrequests', controller.getAdminRequests)
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
    .put('/api/users/:id/isVerified', 
        auth.secureWithAdmin,    
        controller.editUser);

module.exports = usersRouter;



