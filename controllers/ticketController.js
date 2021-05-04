const mongoose = require("mongoose");
const Ticket = require("./../models/ticketModel");
const APIFeatures = require('./../utils/ApiFeatures');

exports.getAllTicket = async (req, res) => {
  try {
    const features = new APIFeatures(Ticket.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tickets = await features.query;

    // const freeTickets = [];

    // for (const ticket of tickets) {
    //   if (!ticket.email || ticket.email == '') freeTickets.push(ticket);
    // }

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
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
