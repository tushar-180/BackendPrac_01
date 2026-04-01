import { ENV } from "../config/env.js";

export const setTokenCookie = (res, token, tokenName) => {
  const maxAge =
    tokenName === "accessToken" ? 15 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000; //15 minutes or 7 days
  const isProduction = ENV.NODE_ENV === "production";

  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "Strict" : "Lax",
    maxAge,
  });
};

export const clearTokenCookie = (res, tokenName) => {
  const isProduction = ENV.NODE_ENV === "production";
  res.clearCookie(tokenName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "Strict" : "Lax",
  });
}