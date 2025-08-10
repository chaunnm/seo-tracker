import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    googleId: { type: String, index: true },
    email: { type: String, required: true, index: true },
    name: String,
    picture: String,
    refreshToken: String,
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
