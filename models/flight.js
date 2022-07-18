const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Destinations (subdocs) will be embedded inside of flight document
const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'LAX', 'JFK', 'MEL', 'SYD', 'LAS', 'DFW', 'DEN', 'SAN']
    },
    arrival: Date,
  }, {
    // automatic createAt & updatedAt properties
    timestamps: true,
  });

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United', 'QANTAS', 'Alaskan']
    },
    airport: {
        type: String,
        enum: ['AUS', 'LAX', 'JFK', 'MEL', 'SYD', 'LAS', 'DFW', 'DEN', 'SAN']
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999  
    },
    departs: {
        type: Date,
        default: function() {
            let today = new Date();
            return today.setFullYear(today.getFullYear() +1);
        }
    },
    destinations: [destinationSchema],
})

module.exports = mongoose.model('Flight', flightSchema);