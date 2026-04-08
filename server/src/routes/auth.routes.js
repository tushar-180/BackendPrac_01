import express from "express";
import {
  getMyDevices,
  login,
  logout,
  logoutAllDevices,
  logoutAllDevicesExceptCurrent,
  logoutDevice,
  refreshAccessToken,
  register,
} from "../controllers/auth.controller.js";

import { authLimiter } from "../middlewares/rateLimit.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", authLimiter, login);
authRouter.get("/my-devices",authMiddleware,getMyDevices);
authRouter.get("/logout", logout);
authRouter.post("/logout-device",authMiddleware, logoutDevice);
authRouter.get("/logout-all",logoutAllDevices);
authRouter.get("/logout-all-except-current",authMiddleware,logoutAllDevicesExceptCurrent);

authRouter.post("/refresh", refreshAccessToken);
export default authRouter;
