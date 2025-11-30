// server/models/User.js - BULLETPROOF VERSION
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["employee", "manager","admin"], default: "employee" },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, default: "" }
}, { timestamps: true });

// FIXED PASSWORD HASHING - NO MIDDLEWARE
userSchema.methods.hashPassword = async function() {
  if (!this.isModified('password')) return this.password;
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(this.password, salt);
};

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
