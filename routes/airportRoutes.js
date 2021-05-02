const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const airportController = require('./../controllers/airportController');

router.use(authController.protect);

router
  .route('/')
  .get(airportController.getAllAirport)
  .post(authController.restrictTo('admin'), airportController.createAirport);

router
  .route('/:id')
  .get(airportController.getAirport)
  .patch(authController.restrictTo('admin'), airportController.updateAirport)
  .delete(authController.restrictTo('admin'), airportController.deleteAirport);

module.exports = router;