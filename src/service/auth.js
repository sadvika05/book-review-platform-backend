const userModel = require("../model/UserModel")
const otpModel = require("../model/OtpModel")
const bcrypt = require("bcrypt");
const {promise} = require("bcrypt/promises");
require("dotenv").config();

const login =  async (data) => {
    const {email, password} = data
    
    const existingUser = await userModel.findOne({email: email})
    
    if(!existingUser || (existingUser && existingUser.googleId !== "")){
        throw new Error("User not found")
    }
    
    const result = await bcrypt.compare(password, existingUser.password);
    
    if(!result){
        throw new Error("Incorrect password")
    }
    
    return {role: existingUser.role, id: existingUser._id};
}

const signup = async (data) => {
    const {email, password, name} = data
    
    const existingUser = await userModel.findOne({email : email})
    
    console.log(existingUser);
    
    if(existingUser && (existingUser.googleId !== "" || existingUser.otpVerifyStatus === "success")){
        throw new Error("User Already Exist")
    }
    
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_VALUE))
    
    if(existingUser){
        return;
    }
    
    const newUser = new userModel({
        email: email,
        name: name,
        password: hashPassword
    })
    
    await newUser.save()
}

const userOtpGenerate = async (data) => {
    const {email, otp} = data
    const exisintingUser = await otpModel.findOne({email: email})
    
    if(exisintingUser){
        await otpModel.findOneAndUpdate({email: email},{otp: otp});
        return
    }
    
    const newUser = new otpModel({
        email : email,
        otp: otp
    })
    
    await newUser.save()
}

const verifyOtp = async (data) => {
    const {email, otp} = data
    const userDetails = await otpModel.findOne({email : email})
    const userFullDetails = await userModel.findOne({email: email})
    
    if(!userDetails){
        throw new Error("User not found")
    }
    
    const result = otp === userDetails.otp;
    
    if(!result){
        throw new Error("Incorrect OTP")
    }
    
    await userModel.findOneAndUpdate({email: email}, {
        otpVerifyStatus: "success"
    })
    
    return {id : userFullDetails._id, role : userFullDetails.role}
}

const forgotPasswordEmailCheck = async (data) => {
    const {email} = data
    
    const exisitingUser = await userModel.findOne({email: email})
    
    if(!exisitingUser){
        throw new Error("User Not Found")
    }
}

const forgotPasswordOtpVerification = async (data) => {
    const {email, otp} = data;
    const userDetails = await otpModel.findOne({email : email})
    if(!userDetails){
        throw new Error("User Not Found")
    }
    const result = otp === userDetails.otp;
    
    if(!result){
        throw new Error("Incorrect OTP")
    }
}

const forgotPasswordChangePassword = async (data) => {
    const {email, password} = data
    
    const existingUser = await userModel.findOne({email : email})
    
    
    if(!existingUser){
        throw new Error("User Not Found")
    }
    
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_VALUE))
    
    await userModel.findOneAndUpdate({
        email : email
    }, {
        password : hashPassword
    })
}

const deleteAllUsers = async (data) =>{
    Promise.allSettled([
        userModel.deleteMany({}),
        otpModel.deleteMany({})
    ]).then(response => {
        console.log("done");
    }).catch(err => {
        throw new Error("something went wrong");
    });
    
}

const getAllUsersOtp =  async(data)=>{
    const otpData = await otpModel.find({}).select(["-_id","-__v"])
    return otpData
}

const getAllUsers = async(data) => {
    const userData = await userModel.find({}).select(["-_id","-__v"])
    return userData
}

module.exports = {
    login,
    signup,
    verifyOtp,
    forgotPasswordEmailCheck,
    forgotPasswordOtpVerification,
    forgotPasswordChangePassword,
    userOtpGenerate,
    deleteAllUsers,
    getAllUsersOtp,
    getAllUsers
}