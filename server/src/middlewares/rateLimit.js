import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs,
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
  standardHeaders: true, //
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 2, // limit each IP to 2 requests per windowMs
  message: {
    success: false,
    message: "Too many login/register attempts. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
