const express = require("express")
const router = express.Router();
const passport = require("passport");
require("./../config/passportConfig");
require('dotenv').config();

const authMiddleware = require("./../middleware/auth")
const authController = require("./../controller/auth")
const {forgotPasswordEmailCheck} = require("../middleware/auth");

router.post("/login", authMiddleware.login, authController.login)
router.post("/signup", authMiddleware.signup, authController.signup)
router.post("/otp-verify", authMiddleware.otpVerify, authController.verifyOtp)
router.get("/forgot-password-email-check", authController.forgotPasswordEmailCheck)
router.post("/forgot-password-otp-verify", authMiddleware.forgotPasswordOtpVerify, authController.forgotPasswordOtpVerification)
router.post("/forgot-password-change-password", authMiddleware.forgotPasswordChange, authController.forgotPasswordChangePassword)
router.delete("/delete-all-users", authController.deleteAllUsers )
router.get("/get-all-otp", authController.getAllUsersOtp)
router.get("/get-all-users", authController.getAllUsers)
router.delete("/logout", authController.logout)

//google login Routes
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
}))
router.get("/google/callback", passport.authenticate("google", { session: false }), async (req, res)=>{
    res.cookie("jwtToken", req.user.token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge:  60 * 60 * 1000,
    });
    res.redirect(process.env.GOOGLE_REDIRECT_URL);
})

module.exports = router
