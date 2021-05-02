const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const airplaneController = require('../controllers/airplaneController');

router.use(authController.protect);

router
  .route('/')
  .get(airplaneController.getAllAirplane)
  .post(authController.restrictTo('admin'), airplaneController.createAirplane);

router
  .route('/:id')
  .get(airplaneController.getAirplane)
  .patch(authController.restrictTo('admin'), airplaneController.updateAirplane)
  .delete(authController.restrictTo('admin'), airplaneController.deleteAirplane);

module.exports = router;