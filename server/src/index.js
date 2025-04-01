import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import { connectToDB } from "./lib/dbConnection.js";
// import job from "./lib/cron.js";

const app = express();

// job.start() // FOR STARTING CRON JOB to not shut render server after 15 minutes || If shut down it takes 1 minutes or more give response
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
