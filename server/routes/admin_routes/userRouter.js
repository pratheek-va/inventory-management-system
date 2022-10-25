const express = require("express");
const router = express.Router();
const userController = require("./../../controllers/userController");

router.route("/").get(userController.getUsers);
router.route("/:userId").get(userController.getUser);
router.route("/:companyId").patch(userController.updateUser);
router
  .route("/register")
  .post(userController.encryptPassword, userController.createUser);

module.exports = router;
