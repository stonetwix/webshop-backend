const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true }, 
    password: {type: String, required: true, select: false },
    role: { type: String, required: true },
    adminRequest: {type: Boolean, required: true }
}); 

const UserModel = mongoose.model('User', userSchema); 

module.exports = UserModel; 