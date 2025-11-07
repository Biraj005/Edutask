import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../Store/AuthContext";

const Login = ({ changeForm }) => {
  const [role, setRole] = useState("teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginhandle, loginpgaeLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = { email, password, role };
    loginhandle(Data);
  };

  return (
    <div className="login-container">
      <div className="role-switch">
        <button
          className={role === "teacher" ? "active" : ""}
          onClick={() => setRole("teacher")}
        >
          Teacher
        </button>
        <button
          className={role === "student" ? "active" : ""}
          onClick={() => setRole("student")}
        >
          Student
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{role === "teacher" ? "Teacher Login" : "Student Login"}</h2>
        <p>Enter your credentials to continue</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          {loginpgaeLoading ? "Logging in..." : "Login"}
        </button>

        <p className="login-link">
          Create account{" "}
          <Link onClick={() => changeForm(false)}>Sign up</Link>
        </p>

        <button
          type="button"
          className="forgot-btn"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </button>
      </form>
    </div>
  );
};

export default Login;
