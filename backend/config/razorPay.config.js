import razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export default razorpay;
