const authService = require("./../service/auth")
const jwt = require("jsonwebtoken");
const nodeMailer = require("../utils/nodeMailer")
require("dotenv").config();

const login = async (req, res) => {
    try{
        const {role, id} = await authService.login(req.body)
        
        const jwtToken = jwt.sign(
            { id: id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        res.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });
        
        res.status(200).json({
            role: role,
            id: id,
            email : req.body.email,
            message:"User Logged In"
        })
    } catch(err){
        
        if(err.message === "User not found"){
            return res.status(404).json({
                message: "User not Found"
            })
        }
        
        if(err.message === "Incorrect password"){
            return res.status(500).json({
                message: "Incorrect password"
            })
        }
        
        res.status(500).json({
            message: err.message
        })
    }
}

const signup = async(req, res) => {
    try{
        await authService.signup(req.body)
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        Promise.allSettled([
                authService.userOtpGenerate({ email: req.body.email, otp: otp }),
                nodeMailer.sendOTPEmail(req.body.email, otp, false)
            ])
            .then((result) => {
                res.status(200).json({
                    message: "OTP Generated"
                });
            }).catch((err) => {
            throw new Error(err.message|| "error occured");
        })
        
    }catch(err){
        if(err.message === "User Already Exist"){
            return res.status(404).json({
                message: "User Already Exist"
            })
        }
        
        res.status(500).json({
            message: err.message
        })
    }
}

const verifyOtp = async (req, res) => {
    try{
        const {id, role} = await authService.verifyOtp(req.body)
        
        const jwtToken = jwt.sign(
            { id: id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        res.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });
        
        res.status(200).json({
            id: id,
            role: role,
            message: "OTP Verified Successfully"
        })
    }catch(err){
        
        if(err.message === "User not found"){
            return res.status(404).json({
                message: "User not Found"
            })
        }
        
        if(err.message === "Incorrect OTP"){
            return res.status(500).json({
                message: "Incorrect OTP"
            })
        }
        
        res.status(500).json({
            message: err.message
        })
    }
}

const forgotPasswordEmailCheck = async (req, res) => {
    const {email} = req.query;
    try{
        if(!email){
            throw  new Error("Enter Email");
        }
        
        await authService.forgotPasswordEmailCheck({email})
        
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        Promise.allSettled([
                authService.userOtpGenerate({ email: email, otp: otp }),
                nodeMailer.sendOTPEmail(email, otp, true)
            ])
            .then((result) => {
                res.status(200).json({
                    message: "OTP Generated"
                });
            }).catch((err) => {
            throw new Error(err.message|| "error occured");
        })
    }catch(err){
        if(err.message === "User Not Found"){
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const forgotPasswordOtpVerification = async(req, res) => {
    try{
        await authService.forgotPasswordOtpVerification(req.body)
        
        res.status(200).json({message : "OTP Verification Successfully"})
    }catch(err){
        if(err.message === "User Not Found"){
            return res.status(404).json({
                message: "User not Found"
            })
        }
        
        if(err.message === "Incorrect OTP"){
            return res.status(500).json({
                message: "Incorrect OTP"
            })
        }
        
        res.status(500).json({
            message: err.message
        })
    }
}

const forgotPasswordChangePassword = async (req, res) => {
    try{
        await authService.forgotPasswordChangePassword(req.body)
        res.status(200).json({message : "Password Changed Successfully"})
    }catch(err){
        if(err.message === "User Not Found"){
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const logout = async (req, res) => {
    try{
        res.clearCookie("jwtToken");
        res.status(200).json({
            message: "User Logged Out"
        })
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deleteAllUsers = async(req, res) => {
    try{
        await authService.deleteAllUsers();
        res.status(200).json({
            message: "all users deleted"
        })
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getAllUsersOtp = async(req,res)=>{
    try{
        const data = await authService.getAllUsersOtp()
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getAllUsers = async(req,res)=>{
    try{
        const data =  await authService.getAllUsers()
        res.status(200).json(data)}catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    login,
    signup,
    verifyOtp,
    forgotPasswordEmailCheck,
    forgotPasswordOtpVerification,
    forgotPasswordChangePassword,
    deleteAllUsers,
    getAllUsersOtp,
    getAllUsers,
    logout
}