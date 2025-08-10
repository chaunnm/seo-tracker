import { Router } from "express";
import { google } from "googleapis";
import { oauth2Client, authUrl } from "../config";
import { User } from "../models";
import { signSession, verifySession } from "../services";

const r = Router();

/** 1) Redirect tới Google OAuth */
r.get("/google", (_req, res) => {
  res.redirect(authUrl());
});

/** 2) Google trả về code → đổi token, lấy userinfo, lưu DB, set cookie */
r.get("/google/callback", async (req, res) => {
  const code = req.query.code as string;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const me = await oauth2.userinfo.get();

  const user = await User.findOneAndUpdate(
    { googleId: me.data.id },
    {
      googleId: me.data.id,
      email: me.data.email,
      name: me.data.name,
      picture: me.data.picture,
      refreshToken: tokens.refresh_token, // chỉ lưu ở server
    },
    { upsert: true, new: true }
  );

  const session = signSession({ uid: user.id });
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("session", session, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: 7 * 24 * 3600 * 1000,
  });

  // quay lại UI
  res.redirect(process.env.FRONTEND_ORIGIN!);
});

/** 3) Lấy user hiện tại (đọc từ cookie session) */
r.get("/me", async (req, res) => {
  const token = req.cookies?.session;
  const payload = verifySession(token);
  if (!payload?.uid) return res.status(401).json({ error: "UNAUTHENTICATED" });
  const user = await User.findById(payload.uid).select("-refreshToken");
  res.json(user);
});

/** 4) Logout */
r.post("/logout", (_req, res) => {
  res.clearCookie("session", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.sendStatus(200);
});

export default r;
