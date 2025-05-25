const mongoose = require("mongoose");

const bookImageSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter a bookId of review"],
        ref: "Books",
    },
    image: {
        data: Buffer,
        contentType: String,
    },
})

const bookImageModel = mongoose.model("bookImages", bookImageSchema);

module.exports = bookImageModel;