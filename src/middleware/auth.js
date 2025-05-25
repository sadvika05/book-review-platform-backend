const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        return res.status(400).send({ message: errorArray[0].msg });
    }
    next();
};

const login = [
    body("email").trim().isEmail().withMessage("Enter Email"),
    body("password").trim().isLength({ min: 1 }).withMessage("Enter Password"),
    validate,
];

const signup = [
    body("email").trim().isEmail().withMessage("Enter Email"),
    body("name").trim().isLength({ min: 1 }).withMessage("Enter Name"),
    body("password").trim().isLength({ min: 1 }).withMessage("Enter Password"),
    validate,
];

const otpVerify = [
    body("email").trim().isEmail().withMessage("Enter Email"),
    body("otp").trim().isLength({ min: 1, max: 6 }).withMessage("Enter Valid Otp"),
    validate,
];

const forgotPasswordEmailCheck = [
    body("email").trim().isEmail().withMessage("Enter Email"),
    validate,
];

const forgotPasswordOtpVerify = [
    body("email").trim().isEmail().withMessage("Enter Email"),
    body("otp").trim().isLength({ min: 1, max: 6 }).withMessage("Enter Valid Otp"),
    validate,
];

const forgotPasswordChange = [
    body("email").trim().isEmail().withMessage("Enter Email"),
    body("password").trim().isLength({ min: 1 }).withMessage("Enter Password"),
    validate,
];

module.exports = {
    otpVerify,
    login,
    signup,
    forgotPasswordEmailCheck,
    forgotPasswordOtpVerify,
    forgotPasswordChange,
};
