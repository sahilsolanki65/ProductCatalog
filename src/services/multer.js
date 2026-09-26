const multer = require('multer');
const path = require('path');

const destination = process.env.CATALOG_UPLOAD_DIR
const fileSize = parseInt(process.env.MAX_CATALOG_FILE_SIZE);

const storage = multer.diskStorage({
  destination: destination,
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: fileSize },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: csv only!');
  }
}
module.exports = { upload };