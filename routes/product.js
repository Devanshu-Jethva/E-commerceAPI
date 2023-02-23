const express = require("express");
const { updateProduct, deleteProduct, getProduct, getAllProduct } = require("../controller/product");
const router = express.Router();

const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.route("/:id").put(verifyTokenAndAdmin, updateProduct).delete(verifyTokenAndAdmin, deleteProduct)

router.route("/find/:id").get(getProduct)

router.route("/").get(getAllProduct)


module.exports = router;