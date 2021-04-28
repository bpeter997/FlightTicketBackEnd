const mongoose = require('mongoose');
const Airplane = require('./airplaneModel');

const flightSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'A flight must have a start date'],
    validate: {
      validator: function(val) {
        return val > Date.now();
      },
      message: 'Startdate should be above the actual time'
    }
  },
  arrivalDate: {
    type: Date,
    required: [true, 'A flight must have an arrival date'],
    validate: {
      validator: function(val) {
        return val > this.startDate;
      },
      message: 'Arrivaldate should be above the start date'
    }
  },
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'Airport',
    required: [true, 'A flight must have an source airport'],
    validate: {
      validator: function(val) {
        return val != this.to;
      },
      message: 'Source cannot be equal to destination'
    }
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'Airport',
    required: [true, 'A flight must have an destination airport'],
    validate: {
      validator: function(val) {
        return val != this.from;
      },
      message: 'Source cannot be equal to destination'
    }
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
    // validate: {
    //   validator: async function(val) {
    //     let airplane = null;
    //     try {
    //       airplane = await Airplane.findById(val);
    //       return ((airplane != null) && (airplane.location + '' == this.from + ''));
    //     } catch (error) {
    //       console.log(error);
    //       return false;
    //     }
    //   },
    //   message: 'Airplane location not equals source airport'
    // }
  },
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
