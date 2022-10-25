const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

router.route("/").get(productController.getProducts);

router.route("/add-product").post(productController.createProduct);

router
  .route("/:productId")
  .get(productController.getProduct)
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct);

router.route(
  "/get-product-from-orderid/:orderId",
  productController.fetchProduct
);

module.exports = router;
