//App create
const express = require("express")
const app = express();

// PORT findout
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Add middleware
app.use(express.json())
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// DB se connnect
const db = require("./config/database")
db.connect();

// cloud se connect
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();

// API route mount karna hai
const upload = require("./routes/FileUpload")
app.use("/api/v1/upload",upload)

// Activate server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})