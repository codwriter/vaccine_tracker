var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientsSchema = new Schema({
    fullname: {
        type: String,
        required: true
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
    vaccineStatus: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    vaccineBrand: {
        type: Number,
    }
}, {
    timestamps: true
});

var Patients = mongoose.model('Patient', patientsSchema);

module.exports = Patients;