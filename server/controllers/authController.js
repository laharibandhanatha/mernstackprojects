// server/controllers/authController.js - MANUAL HASHING (NO MIDDLEWARE)
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const registerUser = async (req, res) => {
  try {
    console.log("Register body:", req.body);
    const { name, email, password, role, employeeId, department } = req.body;
    
    if (!name || !email || !password || !employeeId) {
      return res.status(400).json({ 
        message: "Missing required fields: name, email, password, employeeId" 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { employeeId }] 
    });
    if (userExists) {
      return res.status(400).json({ 
        message: `User already exists: ${userExists.email} / ${userExists.employeeId}` 
      });
    }

    // MANUAL HASHING - NO PRE-SAVE MIDDLEWARE
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,  // ✅ HASHED HERE
      role: role || "employee",
      employeeId,
      department: department || "",
    });

    await user.save();

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
    };

    console.log("User created successfully:", safeUser.name);
    
    res.status(201).json({
      ...safeUser,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
    };

    res.json({
      ...safeUser,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
