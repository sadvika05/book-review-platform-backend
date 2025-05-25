const passport = require("passport");
const mongoose = require("mongoose");
const userModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const generateJWTToken = (role, id) => {
    return jwt.sign({ role : role, id : id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: false
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const existingUser = await userModel.findOne({ googleId: profile.id });
        
        if (existingUser) {
            const token = generateJWTToken(existingUser.role, existingUser._id);
            return cb(null, { token });
        }
        
        const newUser = new userModel({
            email: profile.emails[0].value,
            role: "user",
            googleId: profile.id,
            name: profile.displayName,
            otpVerifyStatus: "success",
            password:"no-password"
        });
        
        const savedUser = await newUser.save();
        
        const token = generateJWTToken(newUser.role, savedUser._id);
        return cb(null, { token });
    } catch (err) {
        return cb(err, null);
    }
}));
