const reviewModel = require("./../model/reviewModel")
const userModel = require("./../model/UserModel")
const bookModel = require("./../model/bookModel")
const contributeBookModel = require("./../model/contributeBookModel")

const getUserDetails = async(data) => {
    const {id} = data;
    const [userDetails, userReviews] = await Promise.all([
        userModel.findById(id).select(["name", "email","role"]),
        reviewModel.find({ userId: id }).populate("bookId",["name","author","-_id"]).select(["review","stars","-_id"]),
    ]);
    
    if(!userDetails) {
        throw new Error("No user found");
    }
    return {user : userDetails, reviews : userReviews}
}

const addReview = async(data) => {
    const {bookId, review, userId, stars} = data;
    const newReview = new reviewModel({
        review : review,
        stars : stars,
        userId : userId,
        bookId : bookId,
    })
    await newReview.save()
}

const contributeBook = async (data) => {
    const {userId, bookName, reason, authorName} = data;
    const existingBook = await bookModel.findOne({name: bookName, author: authorName});
    if(existingBook) {
        throw new Error("Already Exist") ;
    }
    
    const exisitingSuggestoion = await contributeBookModel.findOne({name: bookName, author: authorName});
    
    if(exisitingSuggestoion) {
        return;
    }
    
    const newBook = new contributeBookModel({
        name: bookName,
        userId: userId,
        reason: reason,
        author: authorName
    })
    await newBook.save()
}

module.exports = {
    getUserDetails,
    addReview,
    contributeBook
}