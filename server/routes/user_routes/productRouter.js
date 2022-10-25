const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const authController = require("./../../controllers/authController");

// router.param("id", scholorshipController.checkID);

router.route("/").get(authController.protect, productController.getProducts);

router
  .route("/:productId")
  .get(productController.getProduct)
  .patch(productController.updateProduct);

router.route("/:orderId").get(productController.getProduct);

module.exports = router;
