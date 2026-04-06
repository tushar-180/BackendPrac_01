import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  refreshToken:String,
  device:String,
  ip:String,
  userAgent:String,
  createdAt:{
    type:Date,
    default:Date.now()
  },
  lastActive:{
    type:Date,
    default:Date.now()
  }
})

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sessions: [sessionSchema]
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
//export
export default User;
