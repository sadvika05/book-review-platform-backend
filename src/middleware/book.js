const {body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        return res.status(400).send({ message: errorArray[0].msg });
    }
    next();
};

const addBook = [
    body("name").trim().isLength({min: 1}).withMessage("Enter Name of the Book"),
    body("author").trim().isLength({min: 1}).withMessage("Enter Author"),
    body("category").isArray().isLength({min: 1}).withMessage("Enter Category"),
    validate,
]

const addBookImage = [
    body("id").trim().isMongoId().withMessage("Enter Id of Book"),
    validate,
]

module.exports = {
    addBook,
    addBookImage,
}