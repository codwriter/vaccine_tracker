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
    // 0: 1: 2:
    vaccineStatus: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    vaccineBrand: {
        type: String,
        default:"0"
    }
}, {
    timestamps: true
});

var Patients = mongoose.model('Patient', patientsSchema);

module.exports = Patients;