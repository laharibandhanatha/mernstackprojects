// server/routes/dashboardRoutes.js
import express from "express";
import { getEmployeeDashboard, getManagerDashboard } from "../controllers/dashboardController.js";
import { protect, managerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/employee", protect, getEmployeeDashboard);
router.get("/manager", protect, managerOnly, getManagerDashboard);

export default router;
