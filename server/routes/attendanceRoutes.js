// server/routes/attendanceRoutes.js
import express from "express";
import {
  employeeCheckIn,
  employeeCheckOut,
  getMyHistory,
  getMySummary,
  getTodayStatus,
  getAllAttendance,
  getEmployeeAttendance,
  getTeamSummary,
  exportAttendanceCsv,
  getTodayTeamStatus,
} from "../controllers/attendanceController.js";
import { protect, managerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Employee
router.post("/checkin", protect, employeeCheckIn);
router.post("/checkout", protect, employeeCheckOut);
router.get("/my-history", protect, getMyHistory);
router.get("/my-summary", protect, getMySummary);
router.get("/today", protect, getTodayStatus);

// Manager
router.get("/all", protect, managerOnly, getAllAttendance);
router.get("/employee/:id", protect, managerOnly, getEmployeeAttendance);
router.get("/summary", protect, managerOnly, getTeamSummary);
router.get("/export", protect, managerOnly, exportAttendanceCsv);
router.get("/today-status", protect, managerOnly, getTodayTeamStatus);

export default router;
