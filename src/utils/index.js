import path, { dirname, extname } from "path";

import { fileURLToPath } from "url";

import fs from "fs";

import multer from "multer";

import { v2 as cloudinary } from "cloudinary";

import { CloudinaryStorage } from "multer-storage-cloudinary";

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const publicDirectory = path.join(__dirname, "../../../public");

export const parseFile = multer({ storage });

filesRouter.get("/JSONDownload", async (req, res, next) => {
  try {
    const filename = "whatever.json";
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    const source = getBooksReadableStream();
    const destination = res;

    pipeline(source, destination, (err) => {
      if (err) next(err);
    });
  } catch (error) {
    next(error);
  }
});

filesRouter.get("/PDFDownload", async (req, res, next) => {
  try {
    const filename = "test.pdf";
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`); // this header tells the browser to open the "save file as" dialog
    const source = getPDFReadableStream({
      firstName: "Diego",
      lastName: "Banovaz",
    });
    const destination = res;

    pipeline(source, destination, (err) => {
      if (err) next(err);
    });
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
