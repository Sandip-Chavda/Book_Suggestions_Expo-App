import express from "express";
import { createBookController } from "../controllers/Books/createBookController.js";
import { authMiddleware } from "../middlewares/auht.middleware.js";
import {
  getAllBooksController,
  getUserBooksController,
} from "../controllers/Books/getAllBooksController.js";
import { deleteBookController } from "../controllers/Books/deleteBookController.js";

const router = express.Router();

router.post("/", authMiddleware, createBookController);
router.get("/", authMiddleware, getAllBooksController); // Infinite Scrolling --- OR --- Pagination
router.delete("/:id", authMiddleware, deleteBookController);
router.get("/user", authMiddleware, getUserBooksController); // Get Recommended Books by the logged in user

export default router;
