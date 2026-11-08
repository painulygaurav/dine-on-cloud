import express from "express";
import connectDB from "../config/db.config.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json);
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});
export default app;
