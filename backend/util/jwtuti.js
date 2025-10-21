import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
};
export const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
