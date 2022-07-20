const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

const allAirports = [
    {code: 'AUS', name: 'Austin (AUS)', selected: false},
    {code: 'LAX', name: 'Los Angeles (LAX)', selected: false},
    {code: 'MEL', name: 'Melbourne (MEL)', selected: false},
    {code: 'SYD', name: 'Sydney (SYD)', selected: false},
    {code: 'JFK', name: 'New York City (JFK)', selected: false},
    {code: 'LAS', name: 'Las Vegas (LAS)', selected: false},
    {code: 'DFW', name: 'Dallas Fort Worth (DFW)', selected: false},
    {code: 'DEN', name: 'Denver (DEN)', selected: true},
    {code: 'SAN', name: 'San Deigo (SAN)', selected: false},
]

module.exports = {
    index,
    new: newFlight,
    create,
    show,
};

function index(req, res) {
    Flight.find({})
            .sort('departs')
            .exec(function(err, flight) {
                res.render('flights/index', { flight });
            });
};

function newFlight(req, res) {
    const defaultFlight = new Flight();
    // Obtain the default date
    const dt = defaultFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate, airports: allAirports });
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new');
        // for now, for a successful create/save. let's redirect back to new.ejs
        res.redirect('/flights');
    });
};

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        let airports = allAirports.filter((a) => a.code !== flight.airport && !flight.destinations.some((d) => a.code === d.airport));
        flight.destinations.sort(function(a, b) {
            return a.arrival - b.arrival;
        });
        Ticket.find({flight: flight._id}, function(err, tickets) {
            // Now you can pass both the flight and tickets in the res.render call
            res.render('flights/show', { flight, airports, tickets });
          });
    });
};