import express from "express";
import { syncUser, verifyUser, checkAdmin, makeAdmin } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// Sync a Clerk user into Postgres (called after Clerk sign-in on the frontend)
userRouter.post("/sync", syncUser);

// Verify the current token and return user info (Clerk JWT required)
userRouter.get("/verify", authMiddleware, verifyUser);

// Check if the logged-in user is an admin
userRouter.get("/check-admin", authMiddleware, checkAdmin);

// Grant admin access to a user (should be protected / called manually in dev)
userRouter.post("/make-admin", makeAdmin);

export default userRouter;
