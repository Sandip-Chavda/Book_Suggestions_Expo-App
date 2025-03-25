import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
