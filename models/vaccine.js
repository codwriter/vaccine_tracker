var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vaccinesSchema = new Schema({
    vaccineBrand: {
        type: String,
    },
    vaccineNumber: {
        type:Number
    }
});

var Vaccines = mongoos.model('Vaccine', vaccinesSchema);

module.exports = Vaccines;