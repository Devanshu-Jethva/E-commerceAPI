const express = require("express");
const router = express.Router();
const { updateUser, deleteUser, getUser, getAllUsers, getUserStats } = require("../controller/user");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.route("/:id").put(verifyTokenAndAuthorization, updateUser).delete(verifyTokenAndAuthorization, deleteUser)

router.route("/find/:id").get(verifyTokenAndAdmin, getUser)

router.route("/").get(getAllUsers)

router.route("/stats").get(verifyTokenAndAdmin, getUserStats)

module.exports = router;