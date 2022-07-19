const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controller/destinations');

// The starts with path is '/'

router.post('/flights/:id/destinations', destinationsCtrl.create)

module.exports = router;