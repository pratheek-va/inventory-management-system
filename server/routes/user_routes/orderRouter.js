const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");

router.route("/").get(orderController.getOrders);

router.route("/c/:companyId").get(orderController.getUserOrders);

router.route("/o/:orderId").get(orderController.getOrder);

router.route("/:productId").post(orderController.placeOrder);

module.exports = router;
