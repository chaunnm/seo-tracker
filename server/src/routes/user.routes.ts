import { Router } from "express";
import { User } from "../models";

const r = Router();

// Demo: tạo user để test kết nối Mongo
r.post("/", async (req, res) => {
  try {
    const { email, name } = req.body || {};
    const u = await User.create({ email, name });
    res.status(201).json(u);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default r;
