import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Store/AuthContext";
import "./Signup.css";

const Signup = ({ changeForm }) => {

  const navigte = useNavigate();
  const { signupHandle, signupgaeLoading, loggedIn, setLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    passingYear: "", 
    type: "student",
    password: "",
    confirmPassword: "",
  });

  const [teacher, setTeacher] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      navigte('/home');
    }
  }, [loggedIn, navigte]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "type") {
      setTeacher(value === "teacher");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const submitData = { ...formData };
    if (teacher) delete submitData.passingYear;

    signupHandle(submitData);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Join EduTask to manage assignments efficiently</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="user-type-select"
          required
        >
          <option value="" disabled>
            Select Department
          </option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="IT">IT</option>
          <option value="CE">CE</option>
          <option value="EE">EE</option>
          <option value="ME">ME</option>
        </select>

        {!teacher && (
          <input
            type="number"
            name="passingYear"
            placeholder="Passing Year"
            value={formData.passingYear}
            onChange={handleChange}
            required
          />
        )}

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="user-type-select"
          required
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-btn">
          {signupgaeLoading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="login-link">
          Already have an account?{" "}
          <Link onClick={() => changeForm(true)}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
