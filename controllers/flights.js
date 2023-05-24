const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index,
}

async function index(req, res) {
    try {
        let flights = await Flight.find()
        flights = flights.sort(compareObjects)
        res.render('flights', {
            flights,
            title: 'Flights List',
        })
    } catch (err) {
        console.log(err)
    }
}

function compareObjects(a, b) {
    return new Date(a.departs) - new Date(b.departs);
}

function newFlight(req, res) {
    res.render('flights/new', {errorMsg: ''})
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    try {
        await Flight.create(req.body)
        // console.log(req.body)
        res.redirect('flights')
    } catch (error) {
        console.log(error)
        res.render('flights/new', {errorMsg: error.message})
    }
}
