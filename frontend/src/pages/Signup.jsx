import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-icon">
          <FaBookOpen />
        </div>

        <h1>Create Account</h1>

        <p className="signup-subtitle">
          Join the Book Library Management System
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>

        {message && (
          <p className="signup-message">
            {message}
          </p>
        )}

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;