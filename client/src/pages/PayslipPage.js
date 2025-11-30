// client/src/pages/PayslipPage.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PayslipPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const payslipData = {
    employeeName: user?.name || "John Doe",
    employeeId: user?.employeeId || "EMP001",
    department: user?.department || "IT",
    period: "November 2025",
    basicSalary: "₹45,000",
    hra: "₹12,000",
    specialAllowance: "₹15,000",
    pfDeduction: "₹5,400",
    professionalTax: "₹200",
    grossSalary: "₹72,000",
    totalDeductions: "₹5,600",
    netSalary: "₹66,400"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      padding: "2rem 0",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
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
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              💰 Payslip
            </h1>
            <div style={{ fontSize: "1.2rem", color: "#64748b", marginTop: "0.5rem" }}>
              {payslipData.period}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", marginBottom: "1.5rem" }}>
                👤 Employee Details
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1.1rem" }}>
                <div><strong>Name:</strong> {payslipData.employeeName}</div>
                <div><strong>ID:</strong> {payslipData.employeeId}</div>
                <div><strong>Department:</strong> {payslipData.department}</div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", marginBottom: "1.5rem" }}>
                💳 Summary
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1.1rem" }}>
                <div><strong>Gross Salary:</strong> {payslipData.grossSalary}</div>
                <div><strong>Total Deductions:</strong> {payslipData.totalDeductions}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#10b981", marginTop: "0.5rem" }}>
                  💰 Net Salary: {payslipData.netSalary}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "2px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", marginBottom: "1.5rem" }}>
              📊 Earnings & Deductions
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
              <div>
                <h4 style={{ color: "#059669", fontWeight: "600", marginBottom: "1rem" }}>Earnings</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div>Basic Salary: {payslipData.basicSalary}</div>
                  <div>HRA: {payslipData.hra}</div>
                  <div>Special Allowance: {payslipData.specialAllowance}</div>
                </div>
              </div>
              <div>
                <h4 style={{ color: "#dc2626", fontWeight: "600", marginBottom: "1rem" }}>Deductions</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div>PF Deduction: {payslipData.pfDeduction}</div>
                  <div>Professional Tax: {payslipData.professionalTax}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem", padding: "1.5rem", background: "#f0fdf4", borderRadius: "12px" }}>
            <strong>✅ Payslip generated on: {new Date().toLocaleDateString('en-IN')}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipPage;
