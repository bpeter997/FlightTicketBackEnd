const mongoose = require('mongoose');

const airplaneSchema = new mongoose.Schema({
  licensePlate: {
    type: String,
    unique: true,
    required: [true, 'An airplane must have a licensePlate'],
  },
  type: {
    type: String,
    required: [true, 'An airplane must have a type'],
  },
  capacity: {
    type: Number,
    required: [true, 'A flight must have a capacity'],
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: 'Airport',
    required: [true, 'A flight must have a location'],
  },
});

const Airplane = mongoose.model('Airplane', airplaneSchema);
module.exports = Airplane;
