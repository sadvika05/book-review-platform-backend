const adminService = require("../service/admin")

const getAllSuggestion = async(req, res) => {
    try{
        const data = await adminService.getAllSuggestion()
        res.status(200).json({data: data})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

const updateSuggestion = async (req, res) => {
    try{
        await adminService.updateSuggestion(req.body)
        res.status(200).json({message: "Successfully updated suggestion"})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports = {
    getAllSuggestion,
    updateSuggestion
}