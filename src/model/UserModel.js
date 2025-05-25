const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    otpVerifyStatus: {
        type: String,
        enum:["success","failed"],
        default: "failed"
    },
    googleId: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

const UserModel = mongoose.model("Users", userSchema)

module.exports = UserModel