const Order = require("../models/Order")

const createOrder = async (req, res) => {
    const newOrder = new Order(req.body)
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
}


const updateOrder = async (req, res) => {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })

    res.status(200).json(updatedOrder)
}

const deleteOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order has been deleted...")
}

const getUserOrders = async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId })

    res.status(200).json(orders)
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
}

const getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project:
            {
                month: { $month: "$createdAt" },
                sales: "$amount"
            },
        },
        {
            $group: {
                _id: "$month",
                totla: { $sum: "$sales" }
            },
        },
    ])
    res.status(200).json(income)
}


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrders,
    getAllOrders,
    getMonthlyIncome
}