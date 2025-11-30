// server/controllers/attendanceController.js
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import { Parser } from "json2csv";

const dayStart = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const dayEnd = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};

// Employee

export const employeeCheckIn = async (req, res) => {
  try {
    const today = dayStart();
    let record = await Attendance.findOne({ userId: req.user._id, date: today });
    if (record?.checkInTime) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const checkInTime = new Date();
    const hour = checkInTime.getHours();
    const status = hour > 10 ? "late" : "present";

    if (!record) {
      record = await Attendance.create({
        userId: req.user._id,
        date: today,
        checkInTime,
        status,
      });
    } else {
      record.checkInTime = checkInTime;
      record.status = status;
      await record.save();
    }
    res.json(record);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const employeeCheckOut = async (req, res) => {
  try {
    const today = dayStart();
    const record = await Attendance.findOne({ userId: req.user._id, date: today });
    if (!record || !record.checkInTime) {
      return res.status(400).json({ message: "No check-in for today" });
    }
    if (record.checkOutTime) {
      return res.status(400).json({ message: "Already checked out today" });
    }

    const checkOutTime = new Date();
    const diffMs = checkOutTime - record.checkInTime;
    const hours = diffMs / (1000 * 60 * 60);
    record.checkOutTime = checkOutTime;
    record.totalHours = Number(hours.toFixed(2));
    if (hours < 4) record.status = "half-day";
    await record.save();
    res.json(record);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyHistory = async (req, res) => {
  try {
    const { month, year } = req.query;
    const now = new Date();
    const m = month ? parseInt(month) - 1 : now.getMonth();
    const y = year ? parseInt(year) : now.getFullYear();
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0, 23, 59, 59, 999);

    const records = await Attendance.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    res.json(records);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMySummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    const now = new Date();
    const m = month ? parseInt(month) - 1 : now.getMonth();
    const y = year ? parseInt(year) : now.getFullYear();
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0, 23, 59, 59, 999);

    const records = await Attendance.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    });

    let present = 0,
      absent = 0,
      late = 0,
      halfDay = 0,
      totalHours = 0;
    records.forEach((r) => {
      if (r.status === "present") present++;
      if (r.status === "absent") absent++;
      if (r.status === "late") late++;
      if (r.status === "half-day") halfDay++;
      totalHours += r.totalHours || 0;
    });

    res.json({
      present,
      absent,
      late,
      halfDay,
      totalHours: Number(totalHours.toFixed(2)),
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTodayStatus = async (req, res) => {
  try {
    const today = dayStart();
    const record = await Attendance.findOne({
      userId: req.user._id,
      date: today,
    });
    res.json(record || { status: "not-checked-in" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Manager

export const getAllAttendance = async (req, res) => {
  try {
    const { employeeId, status, dateFrom, dateTo, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = dayStart(new Date(dateFrom));
      if (dateTo) query.date.$lte = dayEnd(new Date(dateTo));
    }

    if (employeeId) {
      const user = await User.findOne({ employeeId });
      if (!user) return res.json({ data: [], total: 0 });
      query.userId = user._id;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Attendance.find(query)
        .populate("userId", "name employeeId department")
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Attendance.countDocuments(query),
    ]);

    res.json({ data, total, page: Number(page), limit: Number(limit) });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getEmployeeAttendance = async (req, res) => {
  try {
    const userId = req.params.id;
    const { dateFrom, dateTo } = req.query;
    const query = { userId };
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = dayStart(new Date(dateFrom));
      if (dateTo) query.date.$lte = dayEnd(new Date(dateTo));
    }
    const data = await Attendance.find(query).sort({ date: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeamSummary = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;
    const match = {};
    if (dateFrom || dateTo) {
      match.date = {};
      if (dateFrom) match.date.$gte = dayStart(new Date(dateFrom));
      if (dateTo) match.date.$lte = dayEnd(new Date(dateTo));
    }

    const summary = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$userId",
          totalPresent: {
            $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
          },
          totalLate: {
            $sum: { $cond: [{ $eq: ["$status", "late"] }, 1, 0] },
          },
          totalHalfDay: {
            $sum: { $cond: [{ $eq: ["$status", "half-day"] }, 1, 0] },
          },
          totalHours: { $sum: "$totalHours" },
        },
      },
    ]);

    const populated = await User.populate(summary, {
      path: "_id",
      select: "name employeeId department",
    });

    res.json(populated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const exportAttendanceCsv = async (req, res) => {
  try {
    const { dateFrom, dateTo, employeeId } = req.query;
    const query = {};
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = dayStart(new Date(dateFrom));
      if (dateTo) query.date.$lte = dayEnd(new Date(dateTo));
    }
    if (employeeId) {
      const user = await User.findOne({ employeeId });
      if (user) query.userId = user._id;
    }

    const data = await Attendance.find(query).populate(
      "userId",
      "name employeeId department"
    );

    const rows = data.map((r) => ({
      employeeId: r.userId.employeeId,
      name: r.userId.name,
      department: r.userId.department || "",
      date: r.date.toISOString().substring(0, 10),
      status: r.status,
      checkInTime: r.checkInTime ? r.checkInTime.toISOString() : "",
      checkOutTime: r.checkOutTime ? r.checkOutTime.toISOString() : "",
      totalHours: r.totalHours,
    }));

    const parser = new Parser();
    const csv = parser.parse(rows);

    res.header("Content-Type", "text/csv");
    res.attachment("attendance.csv");
    res.send(csv);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTodayTeamStatus = async (req, res) => {
  try {
    const today = dayStart();
    const records = await Attendance.find({ date: today }).populate(
      "userId",
      "name employeeId department"
    );

    const present = records.filter(
      (r) => r.status === "present" || r.status === "late"
    ).length;

    const absentees = await User.find({
      role: "employee",
      _id: { $nin: records.map((r) => r.userId._id) },
    }).select("name employeeId department");

    res.json({
      totalRecords: records.length,
      present,
      absent: absentees.length,
      absentees,
      todayRecords: records,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
