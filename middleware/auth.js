import { prisma } from "../config/prisma.js";
import { verifyClerkToken } from "./verifyClerkToken.js";

/**
 * Auth middleware using Clerk.
 * Verifies the Bearer token from Clerk, then upserts the user in Postgres.
 */
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify Clerk session token
    const payload = await verifyClerkToken(token);
    const clerkUserId = payload.sub;

    // Upsert user in Postgres (auto-sync on every auth'd request)
    const user = await prisma.user.upsert({
      where: { id: clerkUserId },
      update: {},
      create: {
        id: clerkUserId,
        email: payload.email ?? "",
        name: payload.name ?? null,
      },
    });

    req.user = {
      id: user.id,
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
