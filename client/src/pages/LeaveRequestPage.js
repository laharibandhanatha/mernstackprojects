// client/src/pages/LeaveRequestPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LeaveRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leaveType: "Sick Leave",
    fromDate: "",
    toDate: "",
    reason: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const leaveTypes = ["Sick Leave", "Casual Leave", "Annual Leave", "Emergency Leave"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      padding: "2rem 0",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
        <button
          onClick={() => navigate("/employee-dashboard")}
          style={{
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "2rem"
          }}
        >
          ← Back to Dashboard
        </button>

        <div style={{
          background: "white",
          padding: "3rem",
          borderRadius: "24px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
          border: "1px solid #dcfce7"
        }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              background: "linear-gradient(135deg, #10b981, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              📅 Leave Request
            </h1>
            <div style={{ fontSize: "1.2rem", color: "#64748b" }}>
              Submit your leave application
            </div>
          </div>

          {submitted ? (
            <div style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "#f0fdf4",
              borderRadius: "16px",
              border: "2px solid #10b981"
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
              <h2 style={{ fontSize: "2rem", color: "#166534", marginBottom: "1rem" }}>
                Leave Request Submitted!
              </h2>
              <p style={{ fontSize: "1.2rem", color: "#64748b", marginBottom: "2rem" }}>
                Your request has been sent to HR. Reference ID: <strong>LR-{Date.now().toString().slice(-6)}</strong>
              </p>
              <button
                onClick={() => navigate("/employee-dashboard")}
                style={{
                  padding: "1rem 2rem",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                🎉 Back to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    Leave Type *
                  </label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #d1d5db",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      background: "white"
                    }}
                    required
                  >
                    {leaveTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    From Date *
                  </label>
                  <input
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #d1d5db",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      background: "white"
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                  To Date *
                </label>
                <input
                  type="date"
                  value={formData.toDate}
                  onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "2px solid #d1d5db",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    background: "white"
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                  Reason *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "2px solid #d1d5db",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                    resize: "vertical",
                    background: "white"
                  }}
                  placeholder="Enter reason for leave..."
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1.25rem",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                📤 Submit Leave Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestPage;
