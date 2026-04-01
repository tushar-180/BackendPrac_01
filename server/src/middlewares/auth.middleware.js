import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({
      message: "accessToken not found",
      success: false,
    });
  }
  try {
    const { id } = jwt.verify(accessToken, ENV.ACCESS_SECRET);

    req.userId = id;
    next();
  } catch (error) {
    console.log(`Auth middleware error: ${error}`);
    return res.status(401).json({
      message: "Access token is invalid or expired",
      success: false,
    });
  }
};
