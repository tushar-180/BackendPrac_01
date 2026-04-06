import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({
      message: "Access token not found",
      success: false,
    });
  }

  try {
    // ✅ verify access token
    const { id } = jwt.verify(accessToken, ENV.ACCESS_SECRET);

    // ✅ get user
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }


    const session = user.sessions.find((s) => s.refreshToken === refreshToken);

    if (!session) {
      return res.status(401).json({
        message: "Session expired. Please login again.",
        success: false,
      });
    }

    // OPTIONAL: update lastActive
    session.lastActive = new Date();
    await user.save();

    req.userId = id;
    req.sessionId = session._id.toString(); // useful later

    next();
  } catch (error) {
    console.log(`Auth middleware error: ${error}`);

    return res.status(401).json({
      message: "Access token is invalid or expired",
      success: false,
    });
  }
};
