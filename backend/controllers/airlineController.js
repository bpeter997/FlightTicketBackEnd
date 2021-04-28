const mongoose = require("mongoose");
const Airline = require("./../models/airlineModel");
const APIFeatures = require('./../utils/ApiFeatures');

exports.getAllAirline = async (req, res) => {
  try {
    const features = new APIFeatures(Airline.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const airlines = await features.query;

    res.status(200).json({
      status: "success",
      results: airlines.length,
      data: {
        airlines,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAirline = async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        airline,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createAirline = async (req, res) => {
  try {
    const newAirline = await Airline.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        airline: newAirline,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAirline = async (req, res) => {
  try {
    const airline = await Airline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        airline,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAirline = async (req, res) => {
  try {
    await Airline.findByIdAndDelete(req.params.id);

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
