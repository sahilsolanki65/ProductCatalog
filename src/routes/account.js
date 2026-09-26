const express = require('express');
const accountRouter = express.Router();
const { getProfile, updateProfile } = require('../controllers/account.js')
const { authentication } = require('../middleware/auth.js')

accountRouter.get('/profile', authentication, getProfile);
accountRouter.patch('/profile', authentication, updateProfile);

module.exports = accountRouter;