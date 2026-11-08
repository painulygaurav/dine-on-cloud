import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        return new Error("Redis connection timeout");
      }

      return Math.min(retries * 100, 3000);
    },
  },
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Redis client error: ", err);
});

try {
  await redisClient.connect();
} catch (err) {
  console.log("Redis connection timeout");
}

export default redisClient;
