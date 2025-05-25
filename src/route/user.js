const express = require('express');
const router = express.Router();

const userController = require("../controller/user")
const userMiddleware = require("../middleware/user");
const jwtVerify = require("./../middleware/jwtVerification")

router.get("/get-user-details", jwtVerify,userController.getUserDetails)
router.post("/add-review",jwtVerify,userMiddleware.addReview,userController.addReview)
router.post("/contribute-book", jwtVerify, userMiddleware.contributeBook, userController.contributeBook)

module.exports = router;