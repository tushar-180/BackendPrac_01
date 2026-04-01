import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Failed to connect with database : ", error);
    process.exit(1);
  }
};
