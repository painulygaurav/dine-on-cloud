import { rateLimit } from "express-rate-limit";

const updateProfileLimit = rateLimit({
  windowMs: 15 * 24 * 60 * 60 * 1000,
  max: 1,
  message: "You can only update your profile once every 15 days",
});

const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

const emailLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: "Too many requests from this IP, please try again after 24 hours",
});

const allUserFetchLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: "Too many requests from this IP",
});

export { updateProfileLimit, loginLimit, emailLimit, allUserFetchLimit };
