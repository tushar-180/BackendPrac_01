import express from "express";

import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import {  globalLimiter } from "./middlewares/rateLimit.js";
import { ENV } from "./config/env.js";

const app = express();

//middlewares
if (ENV.NODE_ENV === "production") { //in prod
  app.set("trust proxy", 1);
}
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter)

//routes
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome",
    success: true,
  });
});
app.use("/api/auth",authRouter);
app.use("/api/users", userRouter);

export default app;
