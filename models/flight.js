const mongoose = require('mongoose')
const flights = require('../controllers/flights')
//optional shortcut to the mongoose.Schema class - schema's always in caps
const Schema = mongoose.Schema

const flightSchema = new Schema({
    airline: {
        type: String, 
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String, 
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN',
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            return new Date().getFullYear()+1
        }
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Flight', flightSchema)
