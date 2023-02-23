const errorHandler = async (err, req, res, next) => {
    if (err.message === "Wrong credentials!") {
        return res.status(500).json({ error: err.message })
    }
    if (err.message === "You are not authenticated") {
        return res.status(401).json({ error: err.message })
    }
    if (err.message === "Token is not valid!") {
        return res.status(403).json({ error: err.message })
    }
    if (err.message === "You are not allowed!") {
        return res.status(403).json({ error: err.message })
    }
    console.log(err);
    return res.status(500).json({ msg: "Something BROCK!" })
}

module.exports = errorHandler