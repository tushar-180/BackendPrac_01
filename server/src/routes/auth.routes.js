import express from "express";
import { login, logout, refreshAccessToken, register } from "../controllers/auth.controller.js";

import { authLimiter } from "../middlewares/rateLimit.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login",authLimiter, login);
authRouter.get("/logout",logout);

authRouter.post("/refresh",refreshAccessToken);
export default authRouter;
