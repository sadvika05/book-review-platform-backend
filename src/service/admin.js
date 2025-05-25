const bookSuggestion = require("./../model/contributeBookModel")

const getAllSuggestion = async(data) => {
    const suggestions = await bookSuggestion.find({}).select(["-__v"]).populate("userId", "email name -_id")
    return suggestions
}

const updateSuggestion = async (data) => {
    const {_id, remark, status} = data;
    await bookSuggestion.updateOne({_id: _id}, {
        remarks: remark, status: status
    })
}

module.exports = {
    getAllSuggestion,
    updateSuggestion,
}