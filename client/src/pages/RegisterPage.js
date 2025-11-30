// src/pages/RegisterPage.js - COMPLETE WITH EMPLOYEE ID
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../features/auth/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employeeId: '',  // ✅ ADDED
    role: 'employee',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = ['employee', 'manager', 'admin'];

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await dispatch(register(formData)).unwrap();
      navigate('/login');
    } catch (err) {
      setError(err || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        padding: "3rem",
        borderRadius: "24px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "500px",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem"
          }}>
            Create Account
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Join our team</p>
        </div>

        {error && (
          <div style={{
            background: "#fee2e2",
            color: "#dc2626",
            padding: "1rem",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            border: "1px solid #fecaca"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.8)"
              }}
              required
            />
          </div>

          {/* Employee ID ✅ NEW */}
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID (EMP001)"
              value={formData.employeeId}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.8)"
              }}
              required
            />
          </div>

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
                background: "rgba(255,255,255,0.8)"
              }}
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 chars)"
              value={formData.password}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.8)"
              }}
              required
              minLength="6"
            />
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.75rem", color: "#374151" }}>
              Role *
            </label>
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
                appearance: "none",
                backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e\")",
                backgroundPosition: "right 1rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em"
              }}
              required
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div style={{ marginBottom: "2rem" }}>
            <input
              type="text"
              name="department"
              placeholder="Department (optional)"
              value={formData.department}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                fontSize: "1rem",
                background: "rgba(255,255,255,0.8)"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1.25rem",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              border: "none",
              borderRadius: "16px",
              fontWeight: "700",
              fontSize: "1.1rem",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 30px rgba(240,147,251,0.4)"
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p style={{ color: "#6b7280" }}>
            Already have an account?{" "}
            <Link to="/login" style={{
              color: "#f093fb",
              fontWeight: "600",
              textDecoration: "none"
            }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
