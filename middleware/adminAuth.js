import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { verifyClerkToken } from "./verifyClerkToken.js";

/**
 * Admin auth middleware using Clerk.
 * Verifies the Clerk token AND checks isAdmin === true in Postgres.
 */
const adminAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // First, accept backend-issued admin JWTs (used by admin panel login without Clerk).
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded?.role === "admin") {
        req.user = {
          id: decoded.id || "admin-local",
          isAdmin: true,
          name: decoded.name || "Admin",
          email: decoded.email || null,
        };
        return next();
      }
    } catch {
      // Not a backend JWT; continue with Clerk verification fallback.
    }

    // Clerk fallback for existing admin users with isAdmin=true in DB.
    const payload = await verifyClerkToken(token);
    const clerkUserId = payload.sub;
    const user = await prisma.user.findUnique({ where: { id: clerkUserId } });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    req.user = {
      id: user.id,
      isAdmin: true,
      name: user.name,
      email: user.email,
    };
    return next();
  } catch (err) {
    console.error("Admin auth error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuthMiddleware;
