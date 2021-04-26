const mongoose = require("mongoose");
const Flight = require("./../models/flightModel");
const APIFeatures = require('./../utils/ApiFeatures');

exports.getAllFlight = async (req, res) => {
  try {
    const features = new APIFeatures(Flight.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const flights = await features.query;

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

exports.getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

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
        aiport: newFlight,
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
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
