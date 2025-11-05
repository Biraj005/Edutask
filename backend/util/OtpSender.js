import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
export const sendOtpEmail = async (to, otp) => {

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family:sans-serif;line-height:1.6">
        <h2>OTP for Password Reset</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h3>${otp}</h3>
        <p>This OTP is valid for <b>3 minutes</b>.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
