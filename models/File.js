const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
require("dotenv").config()

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String
    },
    email: {
        type: String,
    },
    videoUrl: {
        type: String,
    }
})

//POST middleware

fileSchema.post("save", async function (doc) {
    try {
        console.log("DOC ", doc);

        //Transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        })

        //send Mail
        let info = await transporter.sendMail({
            from: "codehelp - by babbar",
            to: doc.email,
            subject: `Your File has been uploaded to cloudinary`,
            html: `<h2>Hello Jee</h2> <p>File uploaded View Here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
            text: `Hey there! Your file ${doc.name} has been successfully uploaded on the platform.`
        });
        console.log("Info ", info);


    } catch (error) {
        console.log(error);
    }
})

const File = mongoose.model("File", fileSchema)
module.exports = File;