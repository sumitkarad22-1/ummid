const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
        console.log("Attempting to connect to MongoDB with URI:", uri);
        const conn = await mongoose.connect(uri);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        global.dbConnected = true;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log("Running in Offline Demo Mode (In-Memory Data).");
        global.dbConnected = false;
        // Do not exit, allow server to run in demo mode
    }
};

module.exports = connectDB;
