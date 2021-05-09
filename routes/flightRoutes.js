const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const flightController = require("./../controllers/flightController");

router.use(authController.protect);

router
  .route("/")
  .get(flightController.getAllFlight)
  .post(authController.restrictTo("admin"), flightController.createFlight);

router
  .route("/:id")
  .get(flightController.getFlight)
  .patch(authController.restrictTo("admin"), flightController.updateFlight)
  .delete(authController.restrictTo("admin"), flightController.deleteFlight);

router.route("/stats/mostPopular").get(flightController.mostPopularFlight);

module.exports = router;
