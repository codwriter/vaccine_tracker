var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    firstname: {
        type: String,
        default: '',
        required:true
    },
    lastname: {
        type: String,
        default: '',
        required:true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', User);