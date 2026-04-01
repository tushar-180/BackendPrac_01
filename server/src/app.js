import express from "express";

import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome",
    success: true,
  });
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

export default app;
