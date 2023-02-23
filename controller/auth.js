require("dotenv").config()
const User = require("../models/User");
const Cryptojs = require("crypto-js");
const { Error } = require("mongoose");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    // app.use(async (req, res) => {
    //     const user = await User.findByToken(req.get('authorization'));

    //     if (!user) throw new Error("access denied");
    //   });

    //   app.use((err, req, res, next) => {
    //     if (err.message === 'access denied') {
    //       res.status(403);
    //       res.json({ error: err.message });
    //     }

    //     next(err);
    //   });
    // ahiya actually aa rite error throw kro to aapde je error-handle.js banayu chhe ema ahiya comment karelo code chhe evo code lakhvo pade aa app.use(err,req,res,next) valo k jema pella upar na code ma error throw karine string match karine error handle vala middleware ma error msg send karyu chhe but
    // ahiya aapdo concept evo chhe k aapde bhi upar na code ni jem express-async-errors no use karyo k je jo error hase to throw kari j nakhse k je aapda error-handler.js ma jase olu err argument chhe ne ema err pass thase and tya apde aapdi rite error ne handle karayi chhe pretty cool haan
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
}

const login = async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) throw new Error("Wrong credentials!")
    const hashedPassword = Cryptojs.AES.decrypt(
        user.password,
        process.env.PASS_SEC
    )
    const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);

    if (originalPassword !== req.body.password) throw new Error("Wrong credentials!")

    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SEC, { expiresIn: "3d" })
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, accessToken })
}

module.exports = {
    register, login
}