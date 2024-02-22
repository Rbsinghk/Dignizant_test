const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/blog/"); // Specify the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname); // Use the original file name for storing the file
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
