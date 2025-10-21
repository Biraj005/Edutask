import transporter from "./mailer.js";

export const sendOtpEmail = async (email, otp) => {
    console.log(email)
  try {
    await transporter.sendMail({
      from: '"Test App" <noreply@testapp.com>',
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: <strong>${otp}</strong></h2>
             <p>This OTP is valid for 5 minutes.</p>`
    });
    console.log(`OTP sent to ${email}: ${otp}`);
  } catch (err) {
    console.error("Error sending OTP:", err);
  }
};
