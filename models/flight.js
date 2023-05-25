const mongoose = require('mongoose')
//optional shortcut to the mongoose.Schema class - schema's always in caps
const Schema = mongoose.Schema

const destinationSchema = new Schema ({
    airport: {
        type: String, 
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN',
    },
    arrival: {
        type: Date
    }
})

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
            let depDate = new Date();
            depDate.setFullYear(depDate.getFullYear() + 1);
            console.log("The dep date really is " + depDate);
            return depDate;
        }
    },
    destinations: {
        type: [destinationSchema]
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Flight', flightSchema)
