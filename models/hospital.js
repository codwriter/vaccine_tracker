var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hospitalsSchema = new Schema({
    hospitalName: {
        type: String,
        default: '',
        required: true
    },
    afm: {
        type:String,
        match: [/^[0-9]+$/i, "Only numbers are allowed!"],
        trim: true,
        minLength: 9,
        maxLength: 9,
        required: true,
        unique: true
    },
    address: {
        type: String,
        default: '',
        required: true
    },
    numberOfDosesAvailable: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var Hospitals = mongoose.model('Hospital', hospitalsSchema);

module.exports = Hospitals;