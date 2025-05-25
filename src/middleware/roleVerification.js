
const addBook = (req, res, next)=>{
    if(req.user.role !== "admin"){
        return res.status(401).send("Not authorized")
    }
    next();
}
const isAdmin = (req, res, next)=>{
    if(req.user.role !== "admin"){
        return res.status(401).send("Not authorized")
    }
    next();
}

module.exports = {
    addBook,
    isAdmin,
}