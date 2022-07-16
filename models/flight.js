const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// let year = today.getFullYear()+1;
// let month = today.getMonth();
// let day = today.getDate();
// let hour = today.getHours();
// let minutes = today.getMinutes();

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
})

module.exports = mongoose.model('Flight', flightSchema);