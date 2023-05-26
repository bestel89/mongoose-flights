var express = require('express');
var router = express.Router();

const ticketsCtrl = require('../controllers/tickets')

//POST /tickets
router.post('/', ticketsCtrl.create)

module.exports = router;
