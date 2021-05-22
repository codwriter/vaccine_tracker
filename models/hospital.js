var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hospitalsSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
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
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required:true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    keypair:{},
    vaccines: [
        {
            vaccineBrand: {
                type: String,
                trim: true,
                required:true
            },
            doses: {
                type: Number,
                required:true
            },
            appointments: {
                type: Number,
                min: 1,
                max: 2,
                required:true
            }
        }
    ]
}, {
    timestamps: true
});

var Hospitals = mongoose.model('Hospital', hospitalsSchema);

module.exports = Hospitals;