const multer = require("multer");
const rawImagesPath = "./public/files/";

const storeUploads = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, rawImagesPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  return multer({ storage: storage });
};
module.exports = storeUploads;
