const UserModel = require('./users.model'); 
const { body, validationResult } = require('express-validator'); 
const bcrypt = require('bcrypt');



exports.getOneUser = async (req, res) => {
    const users = await UserModel.find({})
    res.status(200).json(users); 
}

exports.addUser = async (req, res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() }); 
    }
    const user = req.body;

    const userExists = await UserModel.exists({ 'email': user.email });
         if (userExists) {
            return res.status(400).json('Email already exists');
        }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = await UserModel.create(user)
    res.status(201).json(newUser);
}
