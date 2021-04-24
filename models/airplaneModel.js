const mongoose = require('mongoose');

const airplaneSchema = new mongoose.Schema({
  licensePlate: {
    type: String,
    unique: true,
    required: [true, 'An airplane must have a licensePlate'],
  },
  capacity: {
    type: number,
    required: [true, 'A flight must have a capacity'],
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: 'Airport',
    required: [true, 'A flight must have a location'],
  },
});

const Airplane = mongoose.model('Airplane', flightSchema);
module.exports = Airplane;
