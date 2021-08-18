import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./authors/index.js";
import blogsRouter from "./blogs/index.js";
import { errorHandler } from "./errorHandler.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const server = express();

const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const publicDirectory = path.join(__dirname, "../public");

const whiteList = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.some((allowedUrl) => allowedUrl === origin)) {
      callback(null, true);
    } else {
      const error = new Error("Not allowed by cors!");
      error.status = 403;
      callback(error);
    }
  },
};

server.use(express.static(publicDirectory));
server.use(cors(corsOptions));
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);

server.use(errorHandler);

console.log(listEndpoints(server));

server.listen(port, () => console.log("✅ Server is running on port : ", port));

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
