const { body, validationResult } = require("express-validator");

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors[0].msg()
        })
    }
    next()
}
const addReview = [
    body("review").trim().isLength({ min: 1 }).withMessage("Review is required"),
    body("stars").trim().isLength({ min: 1 }).withMessage("Stars are required"),
    body("bookId").isMongoId().withMessage("BookId is required"),
    validator
]

const contributeBook = [
    body("reason").trim().isLength({ min: 1 }).withMessage("Review is required"),
    body("bookName").trim().isLength({ min: 1 }).withMessage("BookName is required"),
    body("reason").trim().isLength({ min: 1 }).withMessage("Reason is required"),
]

module.exports = {
    addReview,
    contributeBook
}