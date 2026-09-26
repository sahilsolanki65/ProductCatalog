const connectDB = require('../config/db.js');
const User = require('../models/User.js'); 

const adminName = process.env.ADMIN_NAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const CreateAdmin = async () => {
    try {
        if (adminName != null && adminName != "" && adminEmail != null && adminEmail != "" && adminPassword != null && adminPassword != "") {
            const adminExist = await User.findOne({"contactEmail": adminEmail}) 
            if (!adminExist) {
                const admin = await User.insertOne({"companyName": adminName, "contactEmail": adminEmail, "passwordHash": adminPassword, "role": "admin"});
                console.log("Admin registered!");
            } else {
                console.log("Admin Already Exist!");
            }
        } else {
            console.log("Admin Details is empty");
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

connectDB();
CreateAdmin();