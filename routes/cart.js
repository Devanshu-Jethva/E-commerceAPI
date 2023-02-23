const express = require("express");
const router = express.Router();
const { createCart, updateCart, deleteCart, getUserCart, getAllCarts } = require("../controller/cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.route("/").post(verifyToken, createCart).get(verifyTokenAndAdmin, getAllCarts)

router.route("/:id").put(verifyTokenAndAuthorization, updateCart).delete(verifyTokenAndAuthorization, deleteCart)

router.route("/find/:userId").get(verifyTokenAndAuthorization, getUserCart)



module.exports = router;