const mongoose = require("mongoose")
const dotenv = require("dotenv")

async function dbConnect (){
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("DB connected")
    });
}

module.exports = dbConnect