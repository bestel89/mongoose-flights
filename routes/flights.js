var express = require('express');
var router = express.Router();

const flightsCtrl = require('../controllers/flights')

//GET /flights
router.get('/', flightsCtrl.index)

//GET /flights/new
router.get('/new', flightsCtrl.new)

//GET /flights/new
router.get('/:id', flightsCtrl.show)

// POST /flights/:id/update
router.put('/:id', flightsCtrl.update)

//POST /flights
router.post('/', flightsCtrl.create)




module.exports = router;
