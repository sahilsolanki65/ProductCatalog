const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        if (req.body == null || req.body == "") {
            res.status(403).json({
                "success" : false,
                "message" : "Register Data required"
            });
            return;
        }

        companyName = req.body.companyName;
        if (companyName == null || companyName == "") {
            res.status(403).json({
                "success" : false,
                "message" : "Company Name is required"
            });
            return;
        }

        contactEmail = req.body.contactEmail;
        if (contactEmail == null || contactEmail == "") {
            res.status(403).json({
                "success" : false,
                "message" : "Email is required"
            });
            return;
        }

        if (!validEmail(contactEmail)) {
            res.status(403).json({
                "success" : false,
                "message" : "Enter correct Email"
            });
            return;
        }

        password = req.body.password;
        if (password == null || password == "") {
            res.status(403).json({
                "success" : false,
                "message" : "password is required"
            });
            return;
        }

        const userExist = await User.findOne({"contactEmail": contactEmail}) 
        if (userExist) {
            res.status(403).json({
                "success" : false,
                "message" : "Merchant already exist!"
            });
            return;
        }

        const user = await User.insertOne({"companyName": companyName, "contactEmail": contactEmail, "passwordHash": password, "role": "merchant"});
        res.status(201).json({
            "success" : true,
            "message" : "Merchant registered successfully!",
            "data" : user.toJSON()
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function login(req, res) {
    try {
        if (req.body == null || req.body == "") {
            res.status(403).json({
                "success" : false,
                "message" : "login Data required"
            });
            return;
        }

        contactEmail = req.body.contactEmail;
        if (contactEmail == null || contactEmail == "") {
            res.status(403).json({
                "success" : false,
                "message" : "Email is required"
            });
            return;
        }

        password = req.body.password;
        if (password == null || password == "") {
            res.status(403).json({
                "success" : false,
                "message" : "password is required"
            });
            return;
        }

        const userExist = await User.findOne({"contactEmail": contactEmail}) 
        if (!userExist) {
            res.status(403).json({
                "success" : false,
                "message" : "User not exist!"
            });
            return;
        }

        const isValidPassword = await userExist.isValidPassword(password);
        if (!isValidPassword) {
            res.status(401).json({
                "success" : false,
                "message" : "Incorrect password!"
            });
            return;
        }

        const payload = { sub: userExist._id, role: userExist.role };
        const secretKey = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN;

        const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

        res.status(201).json({
            "success" : true,
            "message" : "login successfully!",
            "token" : token
        });
    } catch (err) {
        console.error(err.message);
    }
}

function validEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

module.exports = {register, login};