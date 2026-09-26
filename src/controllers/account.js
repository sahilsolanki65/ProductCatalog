const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

async function getProfile(req, res) {
    try {
        accountId = req.user.sub;
        const userData = await User.findById(accountId) 
        if (!userData) {
            res.status(403).json({
                "success" : false,
                "message" : "Use not eixst!"
            });
            return;
        }

        res.status(201).json({
            "success" : true,
            "data" : userData.toJSON()
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function updateProfile(req, res) {
    try {
        accountId = req.user.sub;
        const userData = await User.findById(accountId) 
        if (!userData) {
            res.status(403).json({
                "success" : false,
                "message" : "Use not eixst!"
            });
            return;
        }

        if (req.body == null || req.body == "") {
            res.status(403).json({
                "success" : false,
                "message" : "Data required for updation"
            });
            return;
        }

        companyName = req.body.companyName;
        contactEmail = req.body.contactEmail;
        if (contactEmail != null && contactEmail != "" && !validEmail(contactEmail)) {
            res.status(403).json({
                "success" : false,
                "message" : "Enter correct Email"
            });
            return;
        }

        currentPassword = req.body.currentPassword;
        passwordHash = req.body.passwordHash;
        if (passwordHash != null && passwordHash != "" && (currentPassword == null || currentPassword == "")) {
            res.status(403).json({
                "success" : false,
                "message" : "currunt password required for password update"
            });
            return;
        }

        if (passwordHash != null && passwordHash != "" && (currentPassword != null && currentPassword != "")) {
            const isValidPassword = await userData.isValidPassword(currentPassword);
            if (!isValidPassword) {
                res.status(401).json({
                    "success" : false,
                    "message" : "Incorrect password!"
                });
                return;
            }
        }

        const user = await User.findOneAndUpdate({"_id": accountId }, {"companyName": companyName, "contactEmail": contactEmail, "passwordHash": passwordHash}, { new: true, runValidators: true });
        res.status(201).json({
            "success" : true,
            "message" : "Update successfully!",
            "data" : user.toJSON()
        });
    } catch (err) {
        console.error(err.message);
    }
}

function validEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

module.exports = {getProfile, updateProfile};