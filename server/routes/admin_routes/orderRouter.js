const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");

router
  .route("/")
  .get(orderController.getOrders)
  .patch(orderController.approveOrder);

router
  .route("/:orderId")
  .get(orderController.getOrder)
  .patch(orderController.approveOrder);

module.exports = router;
