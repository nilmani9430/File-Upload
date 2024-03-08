const mongoose = require('mongoose')

require("dotenv").config()

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true ,
        useUnifiedTopology: true
    })
    .then(console.log("DB connection successfull"))
    .catch((error) => {
        console.log("DB connnection issues");
        console.error(error);
        process.exit(1)
    })
}
