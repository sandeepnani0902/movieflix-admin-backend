const multer = require("multer");
const fs = require("fs");

function ensurepath(folderpath) {
  if (!fs.existsSync(folderpath)) {
    fs.mkdirSync(folderpath, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadpath = "uploads";
    ensurepath(uploadpath);
    cb(null, uploadpath);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
