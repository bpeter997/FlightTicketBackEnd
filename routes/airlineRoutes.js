const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const airlineController = require('./../controllers/airlineController');

router.use(authController.protect);

router
  .route('/')
  .get(airlineController.getAllAirline)
  .post(authController.restrictTo('admin'), airlineController.createAirline);

router
  .route('/:id')
  .get(airlineController.getAirline)
  .patch(authController.restrictTo('admin'), airlineController.updateAirline)
  .delete(authController.restrictTo('admin'), airlineController.deleteAirline);

module.exports = router;