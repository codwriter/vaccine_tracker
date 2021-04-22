var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator = require('mongoose-validator');

var User = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    privateKey: {
        type: String
    },
    publicKey: {
        type:String
    }

});

module.exports = mongoose.model('User', User);