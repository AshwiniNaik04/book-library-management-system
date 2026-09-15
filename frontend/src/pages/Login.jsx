import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
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
        "http://localhost:5000/api/auth/login",
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
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        setMessage(
          data.message || "Invalid email or password"
        );
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">
          <FaBookOpen />
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your Book Library
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;