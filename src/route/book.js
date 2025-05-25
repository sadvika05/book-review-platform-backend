const express = require('express');
const router = express.Router();

const bookController = require("../controller/book")
const bookMiddleware = require("../middleware/book")
const jwtVerification = require("../middleware/jwtVerification");
const roleVerification = require("../middleware/roleVerification");

//multer setup
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/all-book-details", bookController.allBookDetails)

//IMP TWO ROUTE ONE FOR DEVELOPEMENT AND ANOTHER FOR PRODUCTION

// router.post("/add-book-details", bookMiddleware.addBook,bookController.addBook)
router.post("/add-book", jwtVerification, roleVerification.addBook,bookMiddleware.addBook,bookController.addBook)

// router.post("/add-book-image", upload.single("image"),bookMiddleware.addBookImage,bookController.addBookImage)
router.post("/add-book-image", jwtVerification, roleVerification.addBook,upload.single("image"),bookMiddleware.addBookImage,bookController.addBookImage)

router.get("/book-details", bookController.getBookDetail)

// router.delete("/delete-book", bookController.deleteBook)
router.delete("/delete-book", jwtVerification, roleVerification.addBook,bookController.deleteBook)

router.delete("/delete-all-books", bookController.deleteAllBook);

module.exports = router;