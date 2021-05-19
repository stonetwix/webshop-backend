const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    email: {type: String, required: true}, 
    password: {type: String, required: true, select: false}
}); 

const UserModel = mongoose.model('User', userSchema); 

module.exports = UserModel; 