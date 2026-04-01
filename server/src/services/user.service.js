import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const findAllUsers = async () => {
  return await User.find({});
};

export const findUserById = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("INVALID_ID");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
};

export const updateUserById = async (id, data) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("INVALID_ID");
  }

  const updateData = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  });

  if (!updatedUser) {
    throw new Error("USER_NOT_FOUND");
  }

  return updatedUser;
};

export const deleteUserById = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("INVALID_ID");
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return true;
};