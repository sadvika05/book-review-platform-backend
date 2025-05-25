const bookService = require("../service/book")

const allBookDetails = async (req, res) => {
    try{
        const {data} = await bookService.allBookDetails();
        const shuffledData = data.sort(() => Math.random() - 0.5);

        res.status(200).json({ data: shuffledData });
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

const addBook = async (req, res) => {
    try{
        const {bookId} = await bookService.addBook(req.body);
        
        res.status(200).json({
            message: "Book Added",
            bookId: bookId
        })
    }catch(err){
        
        if(err.message === "Book already exists"){
            return res.status(400).json({
                message: "Book already exists"
            })
        }
        
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

const addBookImage = async (req, res) => {
    try{
        await bookService.addBookImage({...req.body, ...req.file});
        res.status(200).json({
            message: "Book Image Added",
        })
    }catch(err){
        if(err.message === "Image is required"){
            return res.status(400).json({
                message: "Image is required"
            })
        }
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

const getBookDetail = async(req, res)=>{
    try{
        const {id} = req.query;
        if(!id){
            throw new Error("id is required")
        }
        const data = await bookService.getBookDetails({id})
        
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}
const deleteBook = async(req, res) => {
    try{
        const {id} = req.query;
        
        if(!id){
            throw new Error("Book id not Found")
        }
        await bookService.deleteBook({id})
        
        res.status(200).json({
            message: "Book deleted successfully",
        })
        
    }catch(err){
        if(err.message === "Book id not Found"){
            return res.status(400).json({
                message: "Book id is Required"
            })
        }
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

const deleteAllBook = async (req, res) => {
    try{
        await bookService.deleteAllBooks()
        res.status(200).json({
            message: "Books Deleted",
        })
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}


module.exports = {
    allBookDetails,
    addBook,
    getBookDetail,
    addBookImage,
    deleteAllBook,
    deleteBook
}