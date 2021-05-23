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
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },

    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    birthdate: {
        type: Date,
        required: true
    },
    amkaUser: {
        type: String,
        match: [/^[0-9]+$/i, "Only numbers are allowed!"],
        trim: true,
        minLength: 11,
        maxLength: 11,
        required: true,
        unigue:true
    }
});

module.exports = mongoose.model('User', User);