import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import { connectToDB } from "./lib/dbConnection.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
