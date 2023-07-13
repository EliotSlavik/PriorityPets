import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import { processUsers } from "./cron/petProcessing.js";

// Database
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB connected!"))
  .catch((err) => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// cron.schedule('0 0 * * *', processUsers); // Executes at 00:00 (midnight) every day
