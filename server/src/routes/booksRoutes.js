import express from "express";
import { createBookController } from "../../controllers/Books/createBookController.js";
import { authMiddleware } from "../../middlewares/Auht.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBookController);

export default router;
