const express = require('express');
const importRouter = express.Router();
const { imports } = require('../controllers/imports.js');
const { authentication } = require('../middleware/auth.js')
const { upload } = require('../services/multer.js');

importRouter.post('/', authentication , upload.single('file'), imports);

module.exports = importRouter;