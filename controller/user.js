
const User = require("../models/User")


const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })

    if (!updatedUser) throw new Error(err)
    res.status(200).json(updatedUser)
}

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted...")
}

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc;
    res.status(200).json(others)
}

const getAllUsers = async (req, res) => {
    const query = req.query.new
    const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
    res.status(200).json(users);
}

const getUserStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" }
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ])
    res.status(200).json(data);
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserStats
}