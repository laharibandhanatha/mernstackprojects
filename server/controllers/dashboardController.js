// server/controllers/dashboardController.js
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

const monthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

export const getEmployeeDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayRecord = await Attendance.findOne({
      userId: req.user._id,
      date: today,
    });

    const { start, end } = monthRange();
    const records = await Attendance.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    let present = 0,
      absent = 0,
      late = 0,
      totalHours = 0;
    records.forEach((r) => {
      if (r.status === "present") present++;
      else if (r.status === "late") late++;
      else if (r.status === "absent") absent++;
      totalHours += r.totalHours || 0;
    });

    const recent = records.slice(0, 7);

    res.json({
      todayStatus: todayRecord || { status: "not-checked-in" },
      monthStats: {
        present,
        absent,
        late,
        totalHours: Number(totalHours.toFixed(2)),
      },
      recent,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getManagerDashboard = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: "employee" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayRecords = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
    }).populate("userId", "name employeeId department");

    const presentCount = todayRecords.filter(
      (r) => r.status === "present" || r.status === "late"
    ).length;

    const absentees = await User.find({
      role: "employee",
      _id: { $nin: todayRecords.map((r) => r.userId._id) },
    }).select("name employeeId department");

    const { start, end } = monthRange();
    const weeklyTrend = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: { day: { $dayOfMonth: "$date" } },
          presentCount: {
            $sum: {
              $cond: [
                { $or: [{ $eq: ["$status", "present"] }, { $eq: ["$status", "late"] }] },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { "_id.day": 1 } },
    ]);

    const departmentAttendance = await Attendance.aggregate([
      {
        $match: { date: { $gte: start, $lte: end } },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $group: {
          _id: "$user.department",
          presentCount: {
            $sum: {
              $cond: [
                { $or: [{ $eq: ["$status", "present"] }, { $eq: ["$status", "late"] }] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    res.json({
      totalEmployees,
      today: {
        present: presentCount,
        absent: absentees.length,
        late: todayRecords.filter((r) => r.status === "late").length,
      },
      weeklyTrend,
      departmentAttendance,
      absentees,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
