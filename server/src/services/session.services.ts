import jwt from "jsonwebtoken";

export const signSession = (payload: object) =>
  jwt.sign(payload, process.env.SESSION_SECRET!, { expiresIn: "7d" });

export const verifySession = (token?: string) => {
  try {
    return token
      ? (jwt.verify(token, process.env.SESSION_SECRET!) as any)
      : null;
  } catch {
    return null;
  }
};
