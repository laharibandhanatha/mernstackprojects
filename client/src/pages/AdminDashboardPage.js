// src/pages/AdminDashboardPage.js - ULTIMATE ENHANCED VERSION
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (!user) return null;

  const handleViewReports = () => navigate("/reports");
  const handleAddEmployee = () => navigate("/register");
  const handleManageTeams = () => {
    console.log("👑 Manage teams clicked");
    // navigate("/teams"); // Add route later
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)",
      padding: "2rem 0",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
        {/* ✨ ENHANCED HEADER WITH CLOCK */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          padding: "2.5rem",
          borderRadius: "32px",
          marginBottom: "3rem",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          <div>
            <h1 style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              background: "linear-gradient(135deg, #f59e0b, #eab308, #ca8a04)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
              lineHeight: "1.1"
            }}>
              Good {currentTime.getHours() < 12 ? "Morning" : currentTime.getHours() < 17 ? "Afternoon" : "Evening"}!
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "1.3rem" }}>
              <span style={{ fontWeight: "600", color: "#fbbf24" }}>
                👑 {user.name}
              </span>
              <span style={{ fontFamily: "monospace", color: "#94a3b8", fontWeight: "600" }}>
                ID: {user.employeeId}
              </span>
              <span style={{ color: "#94a3b8" }}>
                🏢 {user.department || "Headquarters"}
              </span>
            </div>
          </div>
          
          {/* DIGITAL CLOCK */}
          <div style={{
            textAlign: "center",
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "white",
            padding: "2rem",
            borderRadius: "24px",
            minWidth: "200px",
            boxShadow: "0 20px 40px rgba(245,158,11,0.4)"
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

        {/* ✨ SYSTEM STATS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "white", marginBottom: "1.5rem" }}>
              👥 Total Employees
            </h2>
            <div style={{ fontSize: "4rem", fontWeight: "900", color: "#10b981" }}>1,247</div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "white", marginBottom: "1.5rem" }}>
              📊 Today Present
            </h2>
            <div style={{ fontSize: "4rem", fontWeight: "900", color: "#3b82f6" }}>1,115 (89%)</div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "white", marginBottom: "1.5rem" }}>
              ⚠️ Late Today
            </h2>
            <div style={{ fontSize: "4rem", fontWeight: "900", color: "#f59e0b" }}>32</div>
          </div>
        </div>

        {/* ✨ MAIN CONTENT + QUICK ACTIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          {/* ✨ SYSTEM OVERVIEW */}
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "white", marginBottom: "1.5rem" }}>
              📋 System Overview
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h3 style={{ color: "#fbbf24", fontSize: "1.2rem", marginBottom: "1rem" }}>🎯 Key Metrics</h3>
                <ul style={{ color: "rgba(255,255,255,0.9)", lineHeight: "1.8" }}>
                  <li>• Attendance Rate: <strong>94.2%</strong></li>
                  <li>• Active Departments: <strong>12</strong></li>
                  <li>• Total Teams: <strong>47</strong></li>
                </ul>
              </div>
              <div>
                <h3 style={{ color: "#fbbf24", fontSize: "1.2rem", marginBottom: "1rem" }}>🚀 Recent Activity</h3>
                <ul style={{ color: "rgba(255,255,255,0.9)", lineHeight: "1.8" }}>
                  <li>• Employee #EMP0456 checked in</li>
                  <li>• Team report generated</li>
                  <li>• Leave approved for 3 employees</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ✨ QUICK ACTIONS PANEL */}
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            padding: "2rem",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.2)",
            height: "fit-content"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "white", marginBottom: "1.5rem" }}>
              🔔 Quick Actions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button 
                onClick={handleAddEmployee}
                style={{
                  width: "100%",
                  padding: "1.2rem",
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
                ➕ Add Employee
              </button>
              <button 
                onClick={handleViewReports}
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 25px rgba(59,130,246,0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 5px 15px rgba(59,130,246,0.2)";
                }}
              >
                📊 View Reports
              </button>
              <button 
                onClick={handleManageTeams}
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 25px rgba(245,158,11,0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 5px 15px rgba(245,158,11,0.2)";
                }}
              >
                ⚙️ Manage Teams
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
