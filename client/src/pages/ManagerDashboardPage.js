// src/pages/ManagerDashboardPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const ManagerDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      color: "white",
      padding: "2rem",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2.5rem",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "24px",
          backdropFilter: "blur(20px)",
          marginBottom: "3rem",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
        }}>
          <div>
            <h1 style={{
              fontSize: "3rem",
              fontWeight: "900",
              marginBottom: "0.5rem"
            }}>
              👨‍💼 Manager Dashboard
            </h1>
            <div style={{ fontSize: "1.2rem", opacity: 0.9 }}>
              Good {currentTime.getHours() < 12 ? "Morning" : currentTime.getHours() < 17 ? "Afternoon" : "Evening"}!
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
              👤 {user?.name} | {user?.department}
            </div>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              style={{
                padding: "1rem 2rem",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "16px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2rem" 
        }}>
          <div style={{
            background: "rgba(255,255,255,0.2)",
            padding: "2rem",
            borderRadius: "20px",
            backdropFilter: "blur(20px)"
          }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>👥 Team Members</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#10b981" }}>18</div>
          </div>
          
          <div style={{
            background: "rgba(255,255,255,0.2)",
            padding: "2rem",
            borderRadius: "20px",
            backdropFilter: "blur(20px)"
          }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>📊 Today Present</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#3b82f6" }}>16 (89%)</div>
          </div>
          
          <div style={{
            background: "rgba(255,255,255,0.2)",
            padding: "2rem",
            borderRadius: "20px",
            backdropFilter: "blur(20px)"
          }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>⚠️ Late Today</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#ef4444" }}>2</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: "rgba(255,255,255,0.15)",
          padding: "2rem",
          borderRadius: "20px",
          backdropFilter: "blur(20px)",
          marginTop: "2rem"
        }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>🚀 Quick Actions</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{
              padding: "1rem 2rem",
              background: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer"
            }}>
              ➕ Add Team Member
            </button>
            <button style={{
              padding: "1rem 2rem",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer"
            }}>
              📊 Team Reports
            </button>
            <button style={{
              padding: "1rem 2rem",
              background: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer"
            }}>
              👀 View Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
