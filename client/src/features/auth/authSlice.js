// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// Load saved auth (user + token) from localStorage
const storedAuth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

if (storedAuth?.token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${storedAuth.token}`;
}

// Backend loginUser returns: { _id, name, email, role, employeeId, department, token }
export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", data);
      console.log("🔐 Login API response:", res.data);
      return res.data; // flat object from controller
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// Backend registerUser returns same flat shape
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", userData);
      console.log("📝 Register API response:", res.data);
      return res.data; // flat object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const initialState = {
  user: storedAuth?.user || null,   // { _id, name, email, role, employeeId, department }
  token: storedAuth?.token || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("auth");
      delete api.defaults.headers.common["Authorization"];
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
  state.isLoading = false;

  const raw = action.payload; // { _id, name, email, role, employeeId, department, token }

  const normalizedRole = (raw.role || "").toLowerCase();  // "Manager" -> "manager"

  const user = {
    _id: raw._id,
    name: raw.name,
    email: raw.email,
    role: normalizedRole,
    employeeId: raw.employeeId,
    department: raw.department,
  };

  const token = raw.token;

  state.user = user;
  state.token = token || null;
  state.error = null;

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  localStorage.setItem("auth", JSON.stringify({ user, token }));
})
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;

        const raw = action.payload;

        const user = {
          _id: raw._id,
          name: raw.name,
          email: raw.email,
          role: raw.role,
          employeeId: raw.employeeId,
          department: raw.department,
        };

        const token = raw.token;

        state.user = user;
        state.token = token || null;

        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        localStorage.setItem("auth", JSON.stringify({ user, token }));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export { api };
