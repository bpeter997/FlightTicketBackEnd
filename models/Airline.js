const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'An airplane must have a name'],
  },
  contact: {
    type: String,
    required: [true, 'A flight must have a contact'],
  },
});

const Airline = mongoose.model('Airline', flightSchema);
module.exports = Airline;
