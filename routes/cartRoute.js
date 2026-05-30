import express from "express";
import {
  addToCart,
  getCart, // <--- CORRECTED: Changed from getCartItems to getCart
  removeFromCart,
  clearFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/clear", authMiddleware, clearFromCart);
cartRouter.get("/get", authMiddleware, getCart); // <--- CORRECTED: Also changed the endpoint from /:userId to /get, as the controller expects the userId in the request body (req.body.userId), not URL params (req.params.userId).


export default cartRouter;
