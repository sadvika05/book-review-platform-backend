require("dotenv").config()
const jwt = require("jsonwebtoken")

const jwtVerification = (req, res, next) =>{
    const token = req.cookies.jwtToken;
    try{
        if(!token){
            throw new Error("No token provided");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            throw new Error("Incorrect Token")
        }
        req.user = decoded;
        next();
    }catch(err){
        if(err.message === "No token provided"){
            res.status(401).send({
                message: "No token provided"
            })
        }
        if(err.message === "Incorrect Token"){
            res.status(401).send({
                message: "Incorrect Token"
            })
        }
    }
}

module.exports = jwtVerification;