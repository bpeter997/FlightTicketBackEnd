const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');


exports.login = async (req, res, next) => {
    if(req.body.email, req.body.password) {
        passport.authenticate('local', function(error, user) {
            if(error) return res.status(500).send(error);
            req.login(user, function(error) {
                if(error) return res.status(500).send(error);
                return res.status(200).send('Login successful!');
            })
        })(req, res);
    } else {
        return res.status(400).send('Error in login!');
    }
};

exports.signUp = async (req, res, next) => {

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      });

    // if(req.body.email && req.body.email && req.body.password) {
    //     userModel.findOne({username: req.body.username}, (err, user) => {
    //         if(err) return res.status(500).send('DB eror!');
    //         if(user) {
    //             return res.status(400).send('Username is invalid!');
    //         }
    //         const usr = new userModel({username: req.body.username, password: req.body.password, 
    //             email: req.body.email});
    //         usr.save((error) => {
    //             if(error) return res.status(500).send('Error while save');
    //             return res.status(200).send('Successfull save');
    //         })
    //     })
    // } else {
    //     return res.status(400).send('Hibas keres, username, email es password kell');
    // }
};

exports.protect = async (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.status(403).send('You must be logged in!');
    }
    next();
}

exports.logout = async (req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send('Successfull logout');
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
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