import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, ENV.ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, ENV.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};