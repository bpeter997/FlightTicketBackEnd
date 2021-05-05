const mongoose = require('mongoose');
const validator = require('validator');

const ticketSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, 'A ticket must have a price'],
  },
  flight: {
    type: mongoose.Schema.ObjectId,
    ref: 'Flight',
    required: [true, 'Ticket must belong to a flight!'],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
