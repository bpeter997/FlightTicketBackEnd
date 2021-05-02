const mongoose = require("mongoose");
const Airport = require("./../models/airportModel");
const APIFeatures = require('./../utils/ApiFeatures');

exports.getAllAirport = async (req, res) => {
  try {
    const features = new APIFeatures(Airport.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const airports = await features.query;

    res.status(200).json({
      status: "success",
      results: airports.length,
      data: {
        airports,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAirport = async (req, res) => {
  try {
    const airport = await Airport.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        airport,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createAirport = async (req, res) => {
  try {
    const newAirport = await Airport.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        airport: newAirport,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAirport = async (req, res) => {
  try {
    const airport = await Airport.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        airport,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAirport = async (req, res) => {
  try {
    await Airport.findByIdAndDelete(req.params.id);

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
