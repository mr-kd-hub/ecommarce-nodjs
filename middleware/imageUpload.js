//multer specific middleware
const multer = require("multer");
const imageUpload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 2000000, //1mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPEG|JPG|PNG)$/)) {
      return cb(new Error("Not Valide Formate..."));
    }

    cb(undefined, true);
  },
});
module.exports = imageUpload;
