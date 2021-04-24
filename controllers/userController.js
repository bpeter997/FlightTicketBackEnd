const express = require('express');
const User = require('./../models/userModel');

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find(req.body);
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next();
  }
};
