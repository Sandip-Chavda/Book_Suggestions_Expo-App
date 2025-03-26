import express from "express";
import { registerController } from "../../controllers/Auth/registerController.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", async (req, res) => {
  res.send("Login route");
});

export default router;
