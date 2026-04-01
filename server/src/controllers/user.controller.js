import {
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
} from "../services/user.service.js";

import { userSchema } from "../validations/user.validation.js";
import { formatZodErrors } from "../utils/formatErrors.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("GetAllUsers Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    if (error.message === "INVALID_ID") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error("GetUser Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await findUserById(req.userId);

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    if (error.message === "INVALID_ID") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error("Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const result = userSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid user data",
        errors: formatZodErrors(result.error),
      });
    }

    const updatedUser = await updateUserById(req.params.id, result.data);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.message === "INVALID_ID") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error("UpdateUser Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserById(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error.message === "INVALID_ID") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error("DeleteUser Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
