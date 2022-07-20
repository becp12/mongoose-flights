var express = require('express');
var router = express.Router();
const ticketsCtrl = require('../controller/tickets')

// All routes "start with" / (from server.js)
// GET /<%= flight._id %>/tickets/new
router.get('/flights/:id/tickets/new', ticketsCtrl.new);

// DELETE /tickets/:id
router.delete('/flights/:flightId/tickets/:id', ticketsCtrl.delete);

// POST /flights/:id/tickets
router.post('/flights/:id/tickets', ticketsCtrl.create);

module.exports = router;