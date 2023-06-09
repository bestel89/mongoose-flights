const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newFlight,
    newTicket: newTicket,
    create,
    index,
    show,
    update,
    getUniqueDests,
    compareObjectsDeparts,
    compareObjectsDests,
}

async function newTicket(req, res) {
    try {
        const {id} = req.params
        const flight = await Flight.findById(id)
    res.render('flights/newTicket', {
        flight,
        errorMsg: '',
    })
    } catch (err) {
        console.log(err)
    }
}

async function update(req, res, next) {
    const { id } = req.params
    try {
        const flight = await Flight.findById(id)
        flight.destinations.push(req.body)
        await flight.save()
    } catch (err) {
        console.log(err)
    }
    res.redirect(`/flights/${id}`)
}

async function show(req, res) {
    try {
      const id = req.params.id
      const flight = await Flight.findById(id)
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
    } catch (err) {
      console.log('ERROR MESSAGE ->', err.message)
    }
}

function getUniqueDests(arr) {
    const allDests = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    let selectArr = allDests
    for (let i=0; i<arr.length; i++) {
        if (selectArr.includes(arr[i].airport)) { 
            let idxToRemove = selectArr.indexOf(arr[i].airport)
            selectArr.splice(idxToRemove, 1)
        }
    }
    return selectArr
}



async function index(req, res) {
    try {
        let flights = await Flight.find()
        flights = flights.sort(compareObjectsDeparts)
        res.render('flights', {
            flights,
            title: 'Flights List',
        })
    } catch (err) {
        console.log(err)
    }
}

function compareObjectsDeparts(a, b) {
    return new Date(a.departs) - new Date(b.departs);
}

function compareObjectsDests(a, b) {
    return new Date(a.arrival) - new Date(b.arrival);
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
        res.redirect('flights')
    } catch (error) {
        console.log(error)
        res.render('flights/new', {errorMsg: error.message})
    }
}
