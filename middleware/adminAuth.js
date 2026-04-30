import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

/**
 * Admin authentication middleware.
 * Verifies JWT token AND checks that the user has isAdmin: true.
 * Must be placed after body parsing middleware in the Express chain.
 */
const adminAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    req.user = {
      id: user._id.toString(),
      isAdmin: true,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (err) {
    console.error("Admin auth error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuthMiddleware;
