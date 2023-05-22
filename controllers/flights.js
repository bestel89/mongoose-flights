const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
}

async function create(req, res) {
    
}

function newFlight(req, res) {
    res.render('flights/new', {errorMsg: ''})
}