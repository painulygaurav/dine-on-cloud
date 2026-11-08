import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//todo -> run a for loop and make this function run 5 times as retry each having interval of 5 seconds
async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Connected");
}

export default connectDB;
