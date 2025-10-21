import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_TRAP_USER, 
    pass: process.env.MAIL_TRAP_PASSWORD, 
  }
});

export default transporter;
