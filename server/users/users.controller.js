const UserModel = require('./users.model'); 
const { body, validationResult } = require('express-validator'); 


exports.getOneUser = async (req, res) => {
    const users = await UserModel.find({})
    res.status(200).json(users); 
}

exports.addUser = async (req, res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() }); 
    }
    const newUser = await UserModel.create(req.body);;
    res.status(201).json(newUser);
}
