// server/routes/adminRoutes.js - CREATE THIS FILE
import express from "express";
import { getAllUsers, deleteUser, getAttendanceStats } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/stats", protect, adminOnly, getAttendanceStats);

export default router;
