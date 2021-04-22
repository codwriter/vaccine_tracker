var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientsSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    amka: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        min: 1,
        max:120,    
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required:true
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
        default:"0"
    },
    numberOfDoses: {
        type: Number,
        min: 0,
        max: 2, // 
        default: 0
    }
}, {
    timestamps: true
});

var Patients = mongoose.model('Patient', patientsSchema);

module.exports = Patients;