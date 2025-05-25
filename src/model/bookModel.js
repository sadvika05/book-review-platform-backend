const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Please enter a book name"],
    },
    author: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Please enter a author name"],
    },
    category: {
        type: [String],
        required: [true, "Please enter a category"],
    },
});

const bookModel = mongoose.model("Books", bookSchema);

module.exports = bookModel;