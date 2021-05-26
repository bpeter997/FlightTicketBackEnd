const mongoose = require("mongoose");
const Flight = require("./../models/flightModel");
const Airport = require("./../models/airportModel");
const Airline = require("./../models/airlineModel");
const Airplane = require("./../models/airplaneModel");
const APIFeatures = require("./../utils/ApiFeatures");

exports.getAllFlight = async (req, res) => {
  try {
    const features = new APIFeatures(Flight.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const flights = await features.query;

    for (const flight of flights) {
      await setFlightDependencies(flight);
    }

    res.status(200).json({
      status: "success",
      results: flights.length,
      data: {
        flights,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.mostPopularFlight = async (req, res) => {
  try {
    const flight = await Flight.aggregate([
      {
        $group: {
          _id: {
            from: "$from",
            to: "$to",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]);
    if (flight) {
      const from = await Airport.findById(flight[0]._id.from);
      const to = await Airport.findById(flight[0]._id.to);
      flight[0]._id.from = from.location;
      flight[0]._id.to = to.location;
    }
    res.status(200).json({
      status: "success",
      data: {
        flight,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
}

exports.getFlight = async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      await setFlightDependencies(flight);

      res.status(200).json({
        status: "success",
        data: {
          flight,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

exports.createFlight = async (req, res) => {
  try {
    const newFlight = await Flight.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        flight: newFlight,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateFlight = async (req, res) => {
  console.log(req.body);
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });
    console.log(flight);

    res.status(200).json({
      status: "success",
      data: {
        flight,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

async function setFlightDependencies(flight) {
  const source = await Airport.findById(flight.from);
  const destination = await Airport.findById(flight.to);
  const airline = await Airline.findById(flight.airline);
  const airplane = await Airplane.findById(flight.airplane);
  if (source) flight.from = source;
  if (destination) flight.to = destination;
  if (airline) flight.airline = airline;
  if (airplane) flight.airplane = airplane;
}
