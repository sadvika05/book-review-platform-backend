const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
        unique: true,
    }
})

const OtpModel = mongoose.model("UserOtps", otpSchema)

module.exports = OtpModel