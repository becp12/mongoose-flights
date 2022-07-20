const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket,
};

function newTicket(req, res) {
    res.render('tickets/new', { flightId: req.params.id })
};

function create(req, res) {
    const flightId = req.params.id;
    const ticket = new Ticket(req.body);
    ticket.flight = flightId;
    ticket.save(function(err) {
        if (err) return res.redirect(`/flights/${flightId}/tickets/new`);
        res.redirect(`/flights/${flightId}`)
    });
};

function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.id, function(err, ticket) {
        if (err) {
            return res.redirect(`/flights`);
        }
        res.redirect(`/flights/${req.params.flightId}`)
    })
};