
import express from "express";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  deleteOrder,
  adminDeleteOrder,
  createCheckoutSession,
  saveOrderAfterPayment,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const router = express.Router();

// USER ROUTES (require login)
router.post("/place", authMiddleware, placeOrder);
router.post("/verify", authMiddleware, verifyOrder);
router.get("/userorders", authMiddleware, userOrders);
router.delete("/:orderId", authMiddleware, deleteOrder);
router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
router.get("/payment-success", saveOrderAfterPayment);

// ADMIN ROUTES (require login + isAdmin)
router.get("/list", adminAuthMiddleware, listOrders);
router.post("/status", adminAuthMiddleware, updateStatus);
router.delete("/admin/:orderId", adminAuthMiddleware, adminDeleteOrder);

export default router;
