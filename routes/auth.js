const express = require("express");
const { register, login } = require("../controller/auth");
const router = express.Router();

// Register

router.route("/register").post(register)
router.route("/Login").post(login)


module.exports = router;