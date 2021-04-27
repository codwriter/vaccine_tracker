var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* var validate = require('mongoose-validator');
var amkaValidator = [

]; */

var patientsSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    amka: {
        type: String,
        match: [/^[0-9]+$/i, "Only numbers are allowed!"],
        trim: true,
        minLength: 11,
        maxLength: 11,
        required: true,
        unigue:true
    },
    age: {
        type: Number,
        min: 1,
        max: 120,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    // 0: Pending, 1:Completed, 2: Cancelled, -1: Not Scheduled
    vaccineStatus: {
        type: Number,
        min: -1,
        max: 2,
        default: -1
    },
    vaccineBrand: {
        type: String,
        trim: true,
        default: "-"
    },
    numberOfDoses: {
        type: Number,
        min: 0,
        max: 2, // 
        default: 0
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    }
}, {
    timestamps: true
});

var Patients = mongoose.model('Patient', patientsSchema);

module.exports = Patients;