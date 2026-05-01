import { clerkClient } from "@clerk/express";
import { prisma } from "../config/prisma.js";

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
    // Verify Clerk session token
    const payload = await clerkClient.verifyToken(token);
    const clerkUserId = payload.sub;

    // Find user in Postgres
    const user = await prisma.user.findUnique({ where: { id: clerkUserId } });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found in database" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    req.user = {
      id: user.id,
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
