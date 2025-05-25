const express = require("express")
const router = express.Router();

const authRoute = require("./route/auth")
const userRoute = require("./route/user")
const bookRoute = require("./route/book")
const adminRoute = require("./route/admin")

router.use("/auth",authRoute)
router.use("/user", userRoute)
router.use("/book", bookRoute)
router.use("/admin", adminRoute)

router.get("/", (req, res) => {
    res.send("omalaa server is running da")
})

module.exports = router;