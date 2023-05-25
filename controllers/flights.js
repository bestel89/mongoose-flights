const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index,
    show,
    update,
}

async function update(req, res, next) {
    // res.send('hit update route')
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

async function show(req, res, next) {
    try {
      const id = req.params.id
      const flight = await Flight.findById(id)
      let destinations = flight.destinations
      destinations = destinations.sort(compareObjectsDests)
      res.render('flights/show', {
        flight,
        destinations
      })
    } catch (err) {
      console.log('ERROR MESSAGE ->', err.message)
      next() // 
    }
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
        // console.log(req.body)
        res.redirect('flights')
    } catch (error) {
        console.log(error)
        res.render('flights/new', {errorMsg: error.message})
    }
}
