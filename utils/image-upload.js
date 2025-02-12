const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/uploads");
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

//filefilter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("only jpeg, jpg and png file allowed"), false);
  }
};

const upload = multer.upload({
  storage,
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 },
});

module.exports = {
  upload,
  getFileUrl: (req, file) => {
    return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  },
};
