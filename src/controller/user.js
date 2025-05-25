const userService = require("./../service/user")

const getUserDetails = async (req, res) => {
    try{
        const data = await userService.getUserDetails(req.user);
        res.status(200).json({
            reviews : data.reviews,
            user : data.user,
            id: data.id,
        })
    }catch(err){
        if(err.message === "No user found"){
            return res.status(400).json({
                message: "User not found",
            })
        }
        
        res.status(500).json({
            message: err.message,
        })
    }
}

const addReview = async (req, res) => {
    try{
        await userService.addReview({...req.body, userId:req.user.id})
        res.status(200).json({
            message: "Review added",
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

const contributeBook = async (req, res) => {
    try{
        await userService.contributeBook({...req.body, userId:req.user.id})
        
        res.status(200).json({
            message: "Contributed successfully",
        })
    }catch(err){
        if(err.message === "Already Exist"){
            return res.status(400).json({
                message: "Book Already Exists",
            })
        }
        
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

module.exports = {
    getUserDetails,
    addReview,
    contributeBook
};