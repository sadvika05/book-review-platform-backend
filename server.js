const express = require("express")
const app = express()
const appRouter = require("./src/app")
const cors = require("cors")
const helmet = require("helmet")
const expressRateLimit = require("express-rate-limit")
const hpp = require("hpp")
const xss = require("xss-clean")
const cookieParser = require("cookie-parser")
const dbConnect = require("./src/config/dbConnect")
require("dotenv").config()


app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(helmet())
app.use(hpp())
app.use(
    expressRateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);
app.use(cookieParser())

app.use("/api", appRouter);


dbConnect()
app.listen("5000", () => {
    console.log("Server is running on port 5000")
})