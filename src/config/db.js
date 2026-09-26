const mongoose = require('mongoose');

require('dotenv').config();
const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
    try { 
        await mongoose.connect(mongoURL);
        console.log('Mongodb Connected...');
    } catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
