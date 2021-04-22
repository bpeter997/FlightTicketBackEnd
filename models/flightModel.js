const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'A flight must have a start date'],
  },
  arrivalDate: {
    type: Date,
    required: [true, 'A flight must have an arrival date'],
  },
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'Airport',
    required: [true, 'A flight must have an source airport'],
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'Airport',
    required: [true, 'A flight must have an destination airport'],
  },
  airline: {
    type: mongoose.Schema.ObjectId,
    ref: 'Airline',
    required: [true, 'A flight must have a reference airline'],
  },
  airplane: {
    type: mongoose.Schema.ObjectId,
    ref: 'Airplane',
    required: [true, 'A flight must have an airplane'],
  },
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
