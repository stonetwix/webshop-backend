const UserModel = require('./users.model'); 
const { body, validationResult } = require('express-validator'); 
const bcrypt = require('bcrypt');



exports.getOneUser = async (req, res) => {
    const user = await UserModel.find({})
    res.status(200).json(user); 
}


//registrera ny användare, default user 
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

//Logga in som user 
exports.userLogin = async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ 'email': email }).select('+password');
        console.log(user)
        if (!user || !await bcrypt.compare(password, user.password)) {
            res.status(401).json('Incorrect e-mail or password');
            return;
        }

        req.session.email = user.email;
        req.session.role = user.role; 
        res.status(200).json(user);
    
}


//Logga ut som user 
exports.userLogout = (req, res) => {
    if (!req.session.email) {
        return res.status(400).json('You are already logged out');
    }
    req.session = null;
    res.status(200).json('Logged out')
};

exports.whoami = async (req, res) => {
    if (!req.session.email) {
        return res.status(200).json({ error: 'You are not logged in' });
    }
    const user = await UserModel.findOne({ 'email': req.session.email });
    res.status(200).json(user);
}