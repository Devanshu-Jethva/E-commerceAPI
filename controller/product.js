const Product = require("../models/Product")

const createUser = async (req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
}


const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })

    res.status(200).json(updatedProduct)
}

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted...")
}

const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    res.status(200).json(product)
}

const getAllProduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1)
    } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory]
            }
        })
    }
    else {
        products = await Product.find()
    }

    res.status(200).json(products);
}


module.exports = {
    createUser,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProduct
}