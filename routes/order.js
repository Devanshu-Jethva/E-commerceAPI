const express = require("express");
const { createOrder, updateOrder, deleteOrder, getUserOrders, getAllOrders, getMonthlyIncome } = require("../controller/order");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.route("/").post(verifyToken, createOrder).get(verifyTokenAndAdmin, getAllOrders)

router.route("/:id").put(verifyTokenAndAdmin, updateOrder).delete(verifyTokenAndAdmin, deleteOrder)

router.route("/find/:userId").get(verifyTokenAndAuthorization, getUserOrders)

router.route("/income").get(verifyTokenAndAdmin, getMonthlyIncome)


module.exports = router;