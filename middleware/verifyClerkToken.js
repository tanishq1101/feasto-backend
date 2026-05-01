import { verifyToken } from "@clerk/backend";

const authorizedParties = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_PROD,
  process.env.ADMIN_URL_PROD,
].filter(Boolean);

export const verifyClerkToken = async (token) => {
  if (!token) {
    throw new Error("Missing token");
  }

  return verifyToken(token, {
    secretKey: process.env.CLERK_SECRET_KEY,
    ...(authorizedParties.length ? { authorizedParties } : {}),
  });
};

