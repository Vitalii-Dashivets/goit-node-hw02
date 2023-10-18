import multer from "multer";
import path from "path";
import Jimp from "jimp";

const tempDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = multer({
  fileSize: 5 * 1024 * 1024,
});
const upload = multer({
  storage: multerConfig,
  limits,
});

export { upload };
