const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'An airport must have a name'],
  },
  location: {
    type: String,
    required: [true, 'An airport must have a location'],
  },
});

const Airport = mongoose.model('Airport', airportSchema);
module.exports = Airport;
