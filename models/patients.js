var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* var validate = require('mongoose-validator');
var amkaValidator = [

]; */

var patientsSchema = new Schema({
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
    birthday: {
        type: Date,
        default: Date.now,
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
    sex: {
        type: String,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    apointmentA: {
        type: Date,
        trim: true,
        default: Date.now
    },
    apointmentB: {
        type: Date,
        trim: true,
        default: Date.now
    },
    // Pending, Completed, Cancelled
    vaccineStatus: {
        type: String,
        trim: true,
        default:"",
        required: true
    },
    vaccineBrand: {
        type: String,
        trim: true,
        default: "-",
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    additionalInfo: {
        type: String,
        trim:true,
        default: "..."
    }
}, {
    timestamps: true
});

var Patients = mongoose.model('Patient', patientsSchema);

module.exports = Patients;