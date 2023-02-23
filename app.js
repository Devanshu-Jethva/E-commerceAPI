require("dotenv").config();
require("express-async-errors")

const express = require("express");
const app = express()
const connectDB = require("./db/connect")

const userRouter = require("./routes/user")
const registerRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const orderRouter = require("./routes/order")
const cartRouter = require("./routes/cart")

const errorHandler = require("./middleware/error-handler")
const notFound = require("./middleware/not-found")

app.use(express.json())

app.use("/api/auth", registerRouter)
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use("/api/carts", cartRouter)

app.use(errorHandler)
app.use(notFound)


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`app is listening on ${port}...`)
        )
    } catch (error) {
        console.log(error);
    }
}

start();
