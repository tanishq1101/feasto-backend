import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  updateFood,
} from "../controllers/foodController.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const router = express.Router();

// Public: anyone can view the food list
router.get("/list", listFood);

// Admin-only: add, remove, update food items
router.post("/add", adminAuthMiddleware, addFood);
router.post("/remove", adminAuthMiddleware, removeFood);
router.post("/update", adminAuthMiddleware, updateFood);

export default router;
