import "dotenv/config";

export const env = {
  PORT: Number(process.env.PORT || 4000),
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/seo-tracker",
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  NODE_ENV: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",
};
