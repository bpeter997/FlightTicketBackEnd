const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./../models/userModel');
const userModel = mongoose.model('User');

exports.login = async (req, res, next) => {
  if (req.body.email && req.body.password) {
    passport.authenticate('local', function (error, user) {
      if (error) return res.status(401).send(error);
      req.login(user, function (error) {
        if (error) return res.status(500).send(error);
        return res.status(200).send('Login successful!');
      });
    })(req, res);
  } else {
    return res.status(400).send('Error in login!');
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).send('Successfull registration!');
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.protect = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send('You must be logged in!');
  }
  next();
};

exports.logout = async (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
    return res.status(200).send('Successfull logout');
  } else {
    next();
  }
};

exports.restrictTo = async (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).send('You do not have permission to perform this action');
    }
    next();
  };
};

exports.handleLocalStrategy = async function (username, password, done) {
  try {
    const user = await userModel.findOne({ email: username });
    if (!user) return done('User don`t exist!', null);
    const isMatch = await user.comparePasswords(password);
    if (!isMatch) return done('Invalid password!', false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};
