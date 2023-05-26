const mongoose = require('mongoose')
//optional shortcut to the mongoose.Schema class - schema's always in caps
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F][1-9]\d?/,
    },
    price: {
        type: Number, 
        min: 0,
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Ticket', ticketSchema)