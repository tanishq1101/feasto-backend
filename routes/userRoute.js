import express from "express";
import { loginUser, registerUser, verifyUser, adminLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify", verifyUser);
userRouter.post("/admin/login", adminLogin);

export default userRouter;
