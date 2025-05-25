const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/jwtVerification");
const accessVerification = require("../middleware/roleVerification");
const adminController = require("./../controller/admin")

router.get("/check",verifyToken,accessVerification.isAdmin, async (req, res) => {
    res.status(200).json({message: "ok"})
})
router.get("/all-suggestion", verifyToken, accessVerification.isAdmin, adminController.getAllSuggestion )
router.put("/update-suggestion/:id", verifyToken, accessVerification.isAdmin, adminController.updateSuggestion)

module.exports = router;