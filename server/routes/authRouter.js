const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");

// router.param("id", scholorshipController.checkID);

router.post("/login", authController.login);

router.post("/", authController.adminLogin);

module.exports = router;
