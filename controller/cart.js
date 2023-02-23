const Cart = require("../models/Cart")

const createCart = async (req, res) => {
    const newCart = new Cart(req.body)
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
}


const updateCart = async (req, res) => {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })

    res.status(200).json(updatedCart)
}

const deleteCart = async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json("Cart has been deleted...")
}

const getUserCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId })

    res.status(200).json(cart)
}

const getAllCarts = async (req, res) => {
    const carts = await Cart.find()
    res.status(200).json(carts)
}


module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCarts
}