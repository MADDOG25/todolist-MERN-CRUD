import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/todolist");
    console.log(">>> DB IS CONNECTED");
  } catch (error) {
    console.log(error);
  }
};