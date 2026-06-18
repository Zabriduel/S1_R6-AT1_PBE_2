import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { caminhoAbsolutoUploads } from "../server.js";


const verificaDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createMulter = ({ folder, allowedTypes, fileSize }) => {

  const uploadDir = path.join(caminhoAbsolutoUploads, folder);
  verificaDir(uploadDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(12).toString("hex");
      cb(null, `${hash}-${file.originalname}`);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Tipo de arquivo não permitido"));
    }
    cb(null, true);
  };
  return multer ({
    storage,
    limits:{fileSize},
    fileFilter
  })
};

export default createMulter;