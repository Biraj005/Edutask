import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({changeForm}) => {
  const [role, setRole] = useState("teacher"); // default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Role: ${role}, Email: ${email}, Password: ${password}`);
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
        <button type="submit" className="login-btn">Login</button>
         <p className="login-link">
          Create acccount <Link onClick={()=>changeForm(false)}>signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
