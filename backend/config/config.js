const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB");
        

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

module.exports = connectDB