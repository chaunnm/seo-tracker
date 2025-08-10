import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { env } from "./config";
import { authRoutes, gscRoutes, usersRoutes } from "./routes";

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Kết nối Mongo
mongoose
  .connect(env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ Mongo connect error:", err.message);
    process.exit(1);
  });

app.get("/", (_req, res) => {
  res.send("SEO Tracker API is running");
});

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/gsc", gscRoutes);

app.listen(env.PORT, () => {
  console.log(`🚀 API on http://localhost:${env.PORT}`);
});
