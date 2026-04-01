import { loginSchema, userSchema } from "../validations/user.validation.js";
import { formatZodErrors } from "../utils/formatErrors.js";
import {
  createUser,
  // generateToken,
  loginUser,
} from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../config/env.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { clearTokenCookie, setTokenCookie } from "../utils/setTokenCookie.js";

export const register = async (req, res) => {
  try {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: formatZodErrors(result.error),
      });
    }

    const user = await createUser(result.data);

    // const token = generateToken(user._id);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    // setTokenCookie(res, token, "token");
    setTokenCookie(res, accessToken, "accessToken");
    setTokenCookie(res, refreshToken, "refreshToken");

    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
      // token,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error occurred",
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: formatZodErrors(result.error),
      });
    }

    const user = await loginUser(result.data);

    // const token = generateToken(user._id);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    // setTokenCookie(res, token, "token");
    setTokenCookie(res, accessToken, "accessToken");
    setTokenCookie(res, refreshToken, "refreshToken");

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      // token,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please register",
      });
    }

    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error occurred",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const { id } = jwt.verify(refreshToken, ENV.REFRESH_SECRET);
      await User.findByIdAndUpdate(id, {
        refreshToken: null,
      });
    }
    // res.clearCookie("token");
    clearTokenCookie(res, "accessToken");
    clearTokenCookie(res, "refreshToken");

    // await User.findByIdAndUpdate(req.userId, {
    //   refreshToken: null,
    // });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token not found",
    });
  }
  try {
    const { id } = jwt.verify(refreshToken, ENV.REFRESH_SECRET);
    const user = await User.findById(id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Refresh token is invalid or expire",
      });
    }
    const newAccessToken = generateAccessToken(id);
    setTokenCookie(res, newAccessToken, "accessToken");
    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Refresh token is invalid or expired",
    });
  }
};
