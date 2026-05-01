// This file is intentionally left as a placeholder.
// Database connection is handled by Prisma Client in config/prisma.js
export const connectDB = async () => {
  try {
    const { prisma } = await import("./prisma.js");
    await prisma.$connect();
    console.log("✅ Prisma connected to PostgreSQL");
  } catch (err) {
    console.error("❌ Prisma connection error:", err.message);
  }
};
