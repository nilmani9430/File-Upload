const File = require("../models/File")
const cloudinary = require("cloudinary").v2;

// localfileupload -> handler function
exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File Recievced", file);
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path-> ", path);

        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            status: true,
            message: "Local File Uploaded successfully",
        })
    }

    catch (error) {
        console.log("Not able to upload file on server");
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };

    if(quality){
        options.quality=quality;
    }

    options.resource_type="auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format not supported",
            })
        }

        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        })


    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}

exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4", "mov", "avi"];
        const fileType = file.name.split('.').pop().toLowerCase();
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format not supported",
            })
        }

        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url
        })

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video successfully uploaded"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
}

exports.imageSizeReducer = async (req,res) =>{
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format not supported",
            })
        }

        const response = await uploadFileToCloudinary(file, "Codehelp",100);
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        })
        

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
        
    }
}

