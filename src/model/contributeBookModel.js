const mongoose = require('mongoose')

const contributeBookSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
        trim:true
    },
    name: {
        type:String,
        required:true,
        trim:true
    },
    author: {
        type:String,
        required:true,
        trim:true
    },
    reason: {
        type:String,
        required:true,
        trim:true
    },
    status: {
        type:String,
        required:true,
        default:"not approved",
        enum: ["not approved","approved","rejected"]
    },
    remarks: {
        type: String,
        default: '',
    }
},{
    timestamps:true,
    updateTimestamps:true
}
)

const contributeBookModel = mongoose.model("UserBookSuggestions", contributeBookSchema);

module.exports = contributeBookModel

