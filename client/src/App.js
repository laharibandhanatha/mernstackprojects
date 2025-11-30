// src/App.js - COMPLETE WITH ALL PAGES
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';           // ✅ NEW
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';     // ✅ NEW
import ManagerDashboardPage from './pages/ManagerDashboardPage'; // ✅ NEW
import PayslipPage from './pages/PayslipPage';
import ReportsPage from './pages/ReportsPage';
import LeaveRequestPage from './pages/LeaveRequestPage';

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />      {/* ✅ NEW */}
          
          {/* Role-based Dashboards */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboardPage />} />
          
          {/* Employee Quick Actions */}
          <Route path="/payslip" element={<PayslipPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/leave" element={<LeaveRequestPage />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    
  );
}

export default App;
