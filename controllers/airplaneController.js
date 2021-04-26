const mongoose = require("mongoose");
const Airplane = require("./../models/airplaneModel");
const APIFeatures = require('./../utils/ApiFeatures');

exports.getAllAirplane = async (req, res) => {
  try {
    const features = new APIFeatures(Airplane.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const airplanes = await features.query;

    res.status(200).json({
      status: "success",
      results: airplanes.length,
      data: {
        airplanes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAirplane = async (req, res) => {
  try {
    const airplane = await Airplane.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        airplane,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createAirplane = async (req, res) => {
  try {
    const newAirplane = await Airplane.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        aiport: newAirplane,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAirplane = async (req, res) => {
  try {
    const airplane = await Airplane.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        airplane,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAirplane = async (req, res) => {
  try {
    await Airplane.findByIdAndDelete(req.params.id);

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
