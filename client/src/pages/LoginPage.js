// client/src/pages/LoginPage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "employee",          // 👈 default role
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      console.log("✅ User logged in:", user.role);
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "manager":
          navigate("/manager/dashboard");
          break;
        case "employee":
        navigate("/employee-dashboard");
        break;
      default:
        console.log("❌ Unknown role:", user.role);
      }
    }
  }, [user, navigate]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));        // 👈 now sends email, password, role
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          padding: "3rem",
          borderRadius: "24px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "450px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={onSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.8)",
              }}
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.8)",
              }}
              required
            />
          </div>

          {/* Role select */}
          <div style={{ marginBottom: "2rem" }}>
            <select
              name="role"
              value={formData.role}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.8)",
              }}
              required
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "16px",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 30px rgba(102,126,234,0.4)",
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p style={{ color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#667eea",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
