// client/src/app/store.js - COMPLETE
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import attendanceReducer from "../features/attendance/attendanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
  },
});

export default store;
