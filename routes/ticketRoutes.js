const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const ticketController = require("./../controllers/ticketController");

router.use(authController.protect);

router
  .route("/")
  .get(ticketController.getAllTicket)
  .post(authController.restrictTo("admin"), ticketController.createTicket);

router
  .route("/:id")
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(authController.restrictTo("admin"), ticketController.deleteTicket);

router.route("/myTicketStats/:email").get(ticketController.getMyTicketStats);

module.exports = router;
