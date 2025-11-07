import { useContext, useState } from "react";
import "./ForgotPasswordPage.css";
import { AuthContext } from "../Store/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { emailPageLoading, step, getOtp,verifyOtp } = useContext(AuthContext);

  const handleGetOtp = (e) => {
    e.preventDefault();
    console.log("OTP sent to:", email);
    getOtp({ email }).then(() => {
      console.log(email)
    });

  }; const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Password must be same");
      return;
    }

    verifyOtp({email,otp,password:newPassword});

  };

  return (
    <div className="forgot-container">
      {step === 1 ? (
        <form className="forgot-form" onSubmit={handleGetOtp}>
          <h2>Forgot Password</h2>
          <p>Enter your registered email to receive an OTP.</p>

          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="reset-btn">
            {emailPageLoading ? "Getting otp" : "Get OTP"}
          </button>
          <Link className="login-btn" to='/login'>login</Link>
        </form>
      ) : (
        <form className="forgot-form" onSubmit={handleResetPassword}>
          <h2>Reset Password</h2>
          <p>Enter the OTP sent to your email and your new password.</p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-btn">
            {emailPageLoading ? "Submiting" : "Reset Password"}
          </button>
          <Link className="login-btn" to='/login'>login</Link>
        </form>

      )}

    </div>
  );
}

export default ForgotPasswordPage;
