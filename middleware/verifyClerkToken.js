import { verifyToken } from "@clerk/backend";

export const verifyClerkToken = async (token) => {
  if (!token) {
    throw new Error("Missing token");
  }

  return verifyToken(token, {
    secretKey: process.env.CLERK_SECRET_KEY,
  });
};
