var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
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