const requiredEnv = [
  "MONGO_URI",
  "ACCESS_SECRET",
  "REFRESH_SECRET",
  "NODE_ENV",
  "PORT",
];

const missing = requiredEnv.filter((key) => !process.env[key]);


if (missing.length) {
  throw new Error(`Missing env variables: ${missing.join(", ")}`);
}

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
