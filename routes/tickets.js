var express = require('express');
var router = express.Router();
const ticketsCtrl = require('../controller/tickets')

// All routes "start with" /flights (from server.js)
// GET /<%= flight._id %>/tickets/new
router.get('/:id/tickets/new', ticketsCtrl.new);

// POST /flights/:id/tickets
router.post('/:id/tickets', ticketsCtrl.create);

module.exports = router;