const bookModel = require("../model/bookModel")
const bookImageModel = require("../model/bookImageModel")
const reviewModel = require("../model/reviewModel")

//multer setup
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const getAllReview = async (data) => {
    const { id } = data;
    const reviews = await reviewModel
        .find({ bookId: id })
        .select(["stars", "-_id"]);
    let totalStars = 0;
    reviews.forEach((review) => {
        totalStars += parseInt(review.stars);
    });
    if(totalStars === 0) {
        return {
            stars: -1,
        }
    }
    return { stars: Math.round(totalStars / reviews.length) };
};

const allBookDetails = async(data) => {
    const bookDetails = await bookModel.find({}).select(["-__v"]);
    const resultData = await Promise.all(bookDetails.map(async(book) => {
        return {
            ...book._doc,
            stars: await getAllReview({id: book._id}).then(res => res.stars),
        }
    }))
    return { data: resultData };
}

const addBook = async (data) => {
    const {name, author, category} = data
    
    const existingBook = await bookModel.findOne({name: name, author: author})
    
    if (existingBook) {
        throw new Error('Book already exists')
    }
    
    const newBook = new bookModel({
        name: name,
        author: author,
        category: category,
    })
    
    const bookId = await newBook.save()
    return {bookId: bookId._id}
}

const addBookImage = async (data) => {
    const {id, buffer, mimetype} = data
    
    if(!buffer || !mimetype) {
        throw new Error('Image is required')
    }
    
    const newImage = new bookImageModel({
        image : {
            data: buffer,
            mimeType: mimetype,
        },
        bookId: id,
    })
    
    await newImage.save()
}

const getBookDetails = async(data) => {
    const {id} = data
    
    const [bookDetails, bookReviews, bookImageData] = await Promise.all([
        bookModel.findById(id).select(["-__v", "-_id"]),
        reviewModel
            .find({ bookId: id })
            .select("-__v -_id")
            .populate({
                path: "userId",
                select: "name email -_id"
            }),
        bookImageModel.findOne({ bookId: id }).select(["-__v", "-_id","-bookId"]),
    ]);
    
    return {bookDetails, bookReviews, bookImageData};
}

const deleteBook = async(data) => {
    const {id} = data
    await  Promise.all([
        bookModel.deleteOne({_id: id}),
        bookImageModel.deleteMany({bookId: id}),
        reviewModel.deleteMany({bookId: id}),
    ]);
}

const deleteAllBooks = async(data) => {
    await bookModel.deleteMany({})
}

module.exports = {
    allBookDetails,
    addBook,
    getBookDetails,
    deleteBook,
    addBookImage,
    deleteAllBooks,
};