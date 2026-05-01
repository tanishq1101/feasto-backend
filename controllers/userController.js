import { prisma } from "../config/prisma.js";

// Sync Clerk user into the Postgres DB (upsert on first API call)
const syncUser = async (req, res) => {
  try {
    const { id, email, name } = req.body;
    if (!id || !email) {
      return res.status(400).json({ success: false, message: "Missing user data" });
    }

    const user = await prisma.user.upsert({
      where: { id },
      update: { email, name: name || null },
      create: { id, email, name: name || null },
    });

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Sync user error:", error.message);
    return res.status(500).json({ success: false, message: "Error syncing user" });
  }
};

// Verify that the Clerk token is valid (middleware handles actual verification)
// Just confirms the user exists in our DB
const verifyUser = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      return res.status(401).json({ success: false, message: "No auth context" });
    }

    // Auto-upsert: ensure user exists in DB even if sync wasn't explicitly called
    const user = await prisma.user.upsert({
      where: { id: clerkUserId },
      update: {},
      create: {
        id: clerkUserId,
        email: req.auth.sessionClaims?.email ?? "",
        name: req.auth.sessionClaims?.name ?? null,
      },
    });

    return res.json({ success: true, userId: user.id, isAdmin: user.isAdmin });
  } catch (err) {
    console.error("Verify user error:", err.message);
    return res.status(500).json({ success: false, message: "Error verifying user" });
  }
};

// Check whether the currently signed-in Clerk user is an admin
const checkAdmin = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await prisma.user.findUnique({ where: { id: clerkUserId } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: "Not an admin" });
    }

    return res.json({ success: true, message: "Admin verified" });
  } catch (error) {
    console.error("Check admin error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Grant admin privileges to a user (for initial admin setup)
const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isAdmin: true },
    });
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Make admin error:", error.message);
    return res.status(500).json({ success: false, message: "Error granting admin" });
  }
};

export { syncUser, verifyUser, checkAdmin, makeAdmin };
