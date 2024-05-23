const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connection successful", conn.connection.host);
    }
    catch (error) {
        console.log("DB connection failed", error.message);
    }
};

module.exports = connectDB;