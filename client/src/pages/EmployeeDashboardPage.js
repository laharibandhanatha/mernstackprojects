// client/src/pages/EmployeeDashboardPage.js - ULTIMATE ENHANCED VERSION
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchEmployeeDashboard,
  checkIn,
  checkOut,
} from "../features/attendance/attendanceSlice";
import { logout } from "../features/auth/authSlice";

const EmployeeDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { employeeDashboard, loading } = useSelector((state) => state.attendance);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    dispatch(fetchEmployeeDashboard());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (!user) return null;

  const todayStatus = employeeDashboard?.todayStatus?.status || "not-checked-in";
  const isOfficeHours = currentTime.getHours() >= 9 && currentTime.getHours() < 18;
  const hasCheckedInToday = todayStatus === "present" || todayStatus === "late";

  const getStatusColor = (status) => {
    const colors = {
      present: { bg: "#dcfce7", border: "#10b981", text: "#166534" },
      late: { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
      "not-checked-in": { bg: "#f3f4f6", border: "#6b7280", text: "#374151" },
      absent: { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" }
    };
    return colors[status] || colors["not-checked-in"];
  };

  const formatTime = (date) => date ? new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "-";

  const handleCheckIn = () => {
    dispatch(checkIn());
  };

  const handleCheckOut = () => {
    dispatch(checkOut());
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      padding: "2rem 0",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
        {/* ✨ ENHANCED HEADER WITH CLOCK */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          padding: "2.5rem",
          borderRadius: "32px",
          marginBottom: "3rem",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
          border: "1px solid rgba(255,255,255,0.3)"
        }}>
          
          <div>
            <h1 style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              background: "linear-gradient(135deg, #0ea5e9, #0284c7, #0369a1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
              lineHeight: "1.1"
            }}>
              Good {currentTime.getHours() < 12 ? "Morning" : currentTime.getHours() < 17 ? "Afternoon" : "Evening"}!
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "1.3rem" }}>
              <span style={{ fontWeight: "600", color: "#1e40af" }}>
                👤 {user.name}
              </span>
              <span style={{ fontFamily: "monospace", color: "#64748b", fontWeight: "600" }}>
                ID: {user.employeeId}
              </span>
              <span style={{ color: "#64748b" }}>
                🏢 {user.department || "General"}
              </span>
            </div>
          </div>
          
          {/* DIGITAL CLOCK */}
          <div style={{
            textAlign: "center",
            background: "linear-gradient(135deg, #1e40af, #1d4ed8)",
            color: "white",
            padding: "2rem",
            borderRadius: "24px",
            minWidth: "200px",
            boxShadow: "0 20px 40px rgba(30,64,175,0.4)"
          }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>
              {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9 }}>
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            style={{
              padding: "1.2rem 2.5rem",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              border: "none",
              borderRadius: "20px",
              fontWeight: "700",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 15px 35px rgba(239,68,68,0.4)",
              alignSelf: "flex-start",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-4px)";
              e.target.style.boxShadow = "0 25px 50px rgba(239,68,68,0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 15px 35px rgba(239,68,68,0.4)";
            }}
          >
            🚪 Logout
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
          {/* ✨ TODAY'S ATTENDANCE CARD */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e293b", marginBottom: "1.5rem" }}>
              📅 Today's Status
            </h2>
            <div style={{
              textAlign: "center",
              padding: "2rem",
              borderRadius: "20px",
              ...getStatusColor(todayStatus)
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                {todayStatus === "present" ? "✅" : 
                 todayStatus === "late" ? "⚠️" : 
                 todayStatus === "absent" ? "❌" : "⏳"}
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem", color: getStatusColor(todayStatus).text }}>
                {todayStatus === "not-checked-in" ? "Not Checked In" : 
                 todayStatus.charAt(0).toUpperCase() + todayStatus.slice(1).replace('-', ' ')}
              </h3>
              <div style={{ fontSize: "1.2rem", color: getStatusColor(todayStatus).text }}>
                Check In: {formatTime(employeeDashboard?.todayStatus?.checkInTime)} | 
                Check Out: {formatTime(employeeDashboard?.todayStatus?.checkOutTime)}
              </div>
            </div>

            {/* ✨ CHECK IN/OUT BUTTONS */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
              <button
                onClick={handleCheckIn}
                disabled={hasCheckedInToday || loading}
                style={{
                  flex: 1,
                  padding: "1.2rem",
                  background: hasCheckedInToday || loading 
                    ? "#9ca3af" 
                    : "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  cursor: hasCheckedInToday || loading ? "not-allowed" : "pointer",
                  boxShadow: "0 10px 25px rgba(16,185,129,0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  if (!hasCheckedInToday && !loading) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 15px 35px rgba(16,185,129,0.4)";
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 10px 25px rgba(16,185,129,0.3)";
                }}
              >
                {loading ? "⏳ Processing..." : "👋 Check In"}
              </button>
              <button
                onClick={handleCheckOut}
                disabled={!hasCheckedInToday || loading}
                style={{
                  flex: 1,
                  padding: "1.2rem",
                  background: !hasCheckedInToday || loading 
                    ? "#9ca3af" 
                    : "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  cursor: !hasCheckedInToday || loading ? "not-allowed" : "pointer",
                  boxShadow: "0 10px 25px rgba(245,158,11,0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  if (hasCheckedInToday && !loading) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 15px 35px rgba(245,158,11,0.4)";
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 10px 25px rgba(245,158,11,0.3)";
                }}
              >
                {loading ? "⏳ Processing..." : "🏠 Check Out"}
              </button>
            </div>
          </div>

          {/* ✨ QUICK STATS CARD */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e293b", marginBottom: "2rem" }}>
              📊 This Month
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div style={{
                textAlign: "center",
                padding: "1.5rem",
                background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                borderRadius: "16px",
                border: "2px solid #3b82f6"
              }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#1d4ed8" }}>
                  {employeeDashboard?.monthlyStats?.presentDays || 0}
                </div>
                <div style={{ fontSize: "0.95rem", color: "#1e40af", fontWeight: "600" }}>Present Days</div>
              </div>
              <div style={{
                textAlign: "center",
                padding: "1.5rem",
                background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                borderRadius: "16px",
                border: "2px solid #f59e0b"
              }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#92400e" }}>
                  {employeeDashboard?.monthlyStats?.lateDays || 0}
                </div>
                <div style={{ fontSize: "0.95rem", color: "#92400e", fontWeight: "600" }}>Late Days</div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "1.1rem", color: "#64748b" }}>
              Attendance Rate: {(employeeDashboard?.monthlyStats?.attendanceRate || 0).toFixed(1)}%
             
{!isOfficeHours && (
  <div style={{ fontSize: "0.9rem", color: "#ef4444", marginTop: "0.5rem" }}>
    ⏰ Outside Office Hours (9 AM - 6 PM)
  </div>
)}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          {/* ✨ RECENT ATTENDANCE HISTORY */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e293b", marginBottom: "1.5rem" }}>
              📋 Recent Attendance
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.95rem"
              }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontWeight: "700", color: "#374151" }}>Date</th>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontWeight: "700", color: "#374151" }}>Check In</th>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontWeight: "700", color: "#374151" }}>Check Out</th>
                    <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontWeight: "700", color: "#374151" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeDashboard?.recentAttendance?.slice(0, 7).map((record, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "1rem 1.5rem", fontWeight: "600" }}>
                        {new Date(record.date).toLocaleDateString('en-IN', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td style={{ padding: "1rem 1.5rem", color: "#059669" }}>
                        {formatTime(record.checkInTime)}
                      </td>
                      <td style={{ padding: "1rem 1.5rem", color: "#dc2626" }}>
                        {formatTime(record.checkOutTime)}
                      </td>
                      <td style={{ padding: "1rem 1.5rem" }}>
                        <span style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          ...getStatusColor(record.status)
                        }}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan="4" style={{ padding: "2rem", textAlign: "center", color: "#9ca3af" }}>
                        No attendance records yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ✨ NOTIFICATIONS PANEL */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            padding: "2rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            height: "fit-content"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1e293b", marginBottom: "1.5rem" }}>
              🔔 Quick Actions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 25px rgba(139,92,246,0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 5px 15px rgba(139,92,246,0.2)";
                }}
              >
                📄 View Payslip
              </button>
              <button style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 25px rgba(6,182,212,0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 5px 15px rgba(6,182,212,0.2)";
                }}
              >
                📊 Monthly Report
              </button>
              <button style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 25px rgba(16,185,129,0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 5px 15px rgba(16,185,129,0.2)";
                }}
              >
                📅 Leave Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;
