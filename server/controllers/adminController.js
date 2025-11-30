// server/controllers/adminController.js - COMPLETE
import User from "../models/User.js";
import Attendance from "../models/Attendance.js";

export const getAllUsers = async (req, res) => {
  try {
    const { role, department, search } = req.query;
    const query = {};
    
    if (role && role !== "all") query.role = role;
    if (department) query.department = { $regex: department, $options: "i" };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } }
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(users);
  } catch (err) {
    console.error("Admin get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Prevent self-deletion
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user and their attendance records
    await Attendance.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    console.log(`✅ Admin deleted user: ${user.name} (${user.employeeId})`);
    res.json({ 
      message: `User ${user.name} deleted successfully`,
      deletedUser: { id: userId, name: user.name, employeeId: user.employeeId }
    });
  } catch (err) {
    console.error("Admin delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAttendanceStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEmployees = await User.countDocuments({ role: "employee" });
    const totalManagers = await User.countDocuments({ role: "manager" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    // Today's attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAttendance = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow }
    });

    // Monthly stats
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const presentCount = await Attendance.countDocuments({
      date: { $gte: monthStart },
      status: "present"
    });
    const lateCount = await Attendance.countDocuments({
      date: { $gte: monthStart },
      status: "late"
    });

    res.json({
      totalUsers,
      totalEmployees,
      totalManagers,
      totalAdmins,
      todayAttendance,
      monthly: {
        present: presentCount,
        late: lateCount,
        totalDays: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
