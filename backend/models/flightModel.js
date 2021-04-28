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
  transfers: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Flight',
    validate: {
      validator: function(val) {
        for (let i = 0; i < val.length; i++) {
          const element = val[i];
          if (i==0) {
            if (element.from != this.from || element.startDate != this.startDate) return false;
          } else if (i==val.length-1) {
            if (element.to != this.to || element.arrivalDate != this.arrivalDate) return false;
          } else {
            if (val[i-1].to != val[i].from || val[i-1].arrivalDate < val[i].startDate) return false;
          }
        }
        return true;
      },
      message: 'Source cannot be equal to destination'
    }
  },
  airline: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Airline',
    required: [true, 'A flight must have a reference airline'],
  },
  airplane: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Airplane',
    required: [true, 'A flight must have an airplane'],
  },
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
