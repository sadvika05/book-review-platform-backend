const mongoose = require('mongoose');
const {Mongoose} = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User id needed"],
        ref: "Users",
    },
    review: {
        type: String,
        required: [true, "Review is Required"]
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Book ID is Required"],
        ref: "Books"
    },
    stars: {
        type: String,
        required: [true, "Stars is Required"]
    }
})

const reviewModel = mongoose.model("Reviews", reviewSchema);

module.exports = reviewModel;
