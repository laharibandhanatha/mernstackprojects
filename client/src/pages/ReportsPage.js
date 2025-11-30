// client/src/pages/ReportsPage.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReportsPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("monthly");

  const monthlyData = [
    { month: "Nov 2025", present: 20, late: 2, absent: 1, rate: 95.2 },
    { month: "Oct 2025", present: 22, late: 1, absent: 0, rate: 98.5 },
    { month: "Sep 2025", present: 19, late: 3, absent: 2, rate: 90.1 }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      padding: "2rem 0",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <button
          onClick={() => navigate("/employee-dashboard")}
          style={{
            background: "#3b82f6",
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
          border: "1px solid #e2e8f0"
        }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              📊
              Attendance Reports
            </h1>
            <div style={{ fontSize: "1.2rem", color: "#64748b" }}>
              {user?.name || "Employee"} - Detailed Attendance Analytics
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", justifyContent: "center" }}>
            <button
              onClick={() => setActiveTab("monthly")}
              style={{
                padding: "0.75rem 2rem",
                background: activeTab === "monthly" ? "#f59e0b" : "#f3f4f6",
                color: activeTab === "monthly" ? "white" : "#374151",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              📅 Monthly
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              style={{
                padding: "0.75rem 2rem",
                background: activeTab === "weekly" ? "#f59e0b" : "#f3f4f6",
                color: activeTab === "weekly" ? "white" : "#374151",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              📊
              Weekly
            </button>
          </div>

          {activeTab === "monthly" && (
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#f8fafc",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}>
                <thead>
                  <tr style={{ background: "#f59e0b" }}>
                    <th style={{ padding: "1.5rem 1rem", color: "white", fontWeight: "700", textAlign: "left" }}>Month</th>
                    <th style={{ padding: "1.5rem 1rem", color: "white", fontWeight: "700", textAlign: "center" }}>Present</th>
                    <th style={{ padding: "1.5rem 1rem", color: "white", fontWeight: "700", textAlign: "center" }}>Late</th>
                    <th style={{ padding: "1.5rem 1rem", color: "white", fontWeight: "700", textAlign: "center" }}>Absent</th>
                    <th style={{ padding: "1.5rem 1rem", color: "white", fontWeight: "700", textAlign: "center" }}>Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((report, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "1.5rem 1rem", fontWeight: "600" }}>{report.month}</td>
                      <td style={{ padding: "1.5rem 1rem", textAlign: "center", color: "#10b981" }}>{report.present}</td>
                      <td style={{ padding: "1.5rem 1rem", textAlign: "center", color: "#f59e0b" }}>{report.late}</td>
                      <td style={{ padding: "1.5rem 1rem", textAlign: "center", color: "#ef4444" }}>{report.absent}</td>
                      <td style={{ padding: "1.5rem 1rem", textAlign: "center", fontWeight: "700", color: "#10b981" }}>
                        {report.rate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "weekly" && (
            <div style={{
              textAlign: "center",
              padding: "4rem",
              color: "#9ca3af",
              fontSize: "1.2rem"
            }}>
              📊 Weekly reports coming soon! Stay tuned ✨
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button style={{
              padding: "1rem 3rem",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
              border: "none",
              borderRadius: "16px",
              fontSize: "1.1rem",
              fontWeight: "700",
              cursor: "pointer"
            }}>
              📥 Download PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
