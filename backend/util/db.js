import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const DB_URL = process.env.DB_URL;

export const connectDb = async () => {
  try {
    await mongoose.connect(`${DB_URL}/edutask`);
    console.log('Db connection success');
  } catch (error) {
    console.error(`Error while connecting db ${error}`);
  }
};
