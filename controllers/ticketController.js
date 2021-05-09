const mongoose = require("mongoose");
const Ticket = require("./../models/ticketModel");
const Flight = require("./../models/flightModel");
const APIFeatures = require("./../utils/ApiFeatures");

exports.getAllTicket = async (req, res) => {
  try {
    const features = new APIFeatures(Ticket.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tickets = await features.query;

    res.status(200).json({
      status: "success",
      results: tickets.length,
      data: {
        tickets: tickets,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getMyTicketStats = async (req, res) => {
  try {
    const ticket = await Ticket.aggregate([
      {
        $lookup: {
          from: Flight.collection.name,
          localField: "flight",
          foreignField: "_id",
          as: "flight",
        },
      },
      {
        $unwind: "$flight",
      },
      {
        $match: {
          email: req.params.email,
          "flight.startDate": {
            $gte: new Date(new Date().getFullYear().toString()),
            $lt: new Date(new Date().getFullYear() + 1).toString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          allPrice: { $sum: "$price" },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        ticket,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        ticket,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        ticket: newTicket,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const tempTicket = await Ticket.findById(req.params.id);

    let ticket = null;

    if (tempTicket && !tempTicket.email && req.body.email) {
      await Ticket.findByIdAndDelete(req.params.id);
      ticket = await Ticket.create({
        price: tempTicket.price,
        flight: tempTicket.flight,
        email: req.body.email,
      });
    } else {
      ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        ticket,
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

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);

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
