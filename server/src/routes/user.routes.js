import express from "express";
import { deleteUser, getAllUsers, getUser, profile, updateUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/",authMiddleware, getAllUsers);
userRouter.get("/profile",authMiddleware, profile);
userRouter.get("/:id",authMiddleware, getUser);
userRouter.put("/:id",authMiddleware, updateUser);
userRouter.delete("/:id",authMiddleware, deleteUser);

export default userRouter;
