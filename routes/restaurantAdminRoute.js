import express from "express";
import adminAuthMiddleware from "../middleware/adminAuth.js";
import {
  addRestaurant,
  deleteRestaurant,
  listRestaurants,
  updateRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

// All restaurant admin routes require admin authentication

// Add restaurant
router.post("/add", adminAuthMiddleware, addRestaurant);

// Get all restaurants (admin)
router.get("/list", adminAuthMiddleware, listRestaurants);

// Delete restaurant
router.delete("/delete/:id", adminAuthMiddleware, deleteRestaurant);

// Update restaurant
router.put("/update/:id", adminAuthMiddleware, updateRestaurant);

export default router;
