var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controller/flights')

// All routes "start with" /movies (from server.js)

// GET /flights (index functionality)
router.get('/', flightsCtrl.index);
// GET /flights/new (new functionality)
router.get('/new', flightsCtrl.new);
// GET /flights/:id (show functionality)
router.get('/:id', flightsCtrl.show);
// POST /flights
router.post('/', flightsCtrl.create);

module.exports = router;
