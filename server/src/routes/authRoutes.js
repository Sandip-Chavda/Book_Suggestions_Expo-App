import express from "express";
import { registerController } from "../controllers/Auth/registerController.js";
import { loginController } from "../controllers/Auth/loginSontroller.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
