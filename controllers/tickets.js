const Ticket = require('../models/ticket')
const Flight = require('../models/flight')
const { getUniqueDests, compareObjectsDeparts, compareObjectsDests } = require("../controllers/flights");

module.exports = {
    create
}

async function create(req, res) {
    // console.log(req.body)
    // console.log(req.params.id)
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    try {
        const ticket = await Ticket.create(req.body)
        const flight = await Flight.findById(req.body.flight)
        // console.log(flight)
        // res.send('test')
        let destinations = flight.destinations
        destinations = destinations.sort(compareObjectsDests)
        let uniqueDestinations = getUniqueDests(destinations)
        const tickets = await Ticket.find({flight: flight.id})
        res.render('flights/show', {
            flight,
            tickets,
            destinations,
            uniqueDestinations,
      })
    } catch (error) {
        console.log(error)
    }
}
