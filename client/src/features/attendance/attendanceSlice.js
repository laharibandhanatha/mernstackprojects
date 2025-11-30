// client/src/features/attendance/attendanceSlice.js - COMPLETE WORKING VERSION
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Mock checkIn API call
export const checkIn = createAsyncThunk(
  'attendance/checkIn',
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log('🚀 Check In API Called!');
      
      // Mock delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fakeResponse = {
        success: true,
        status: 'present',
        checkInTime: new Date().toISOString(),
        message: 'Checked in successfully at ' + new Date().toLocaleTimeString()
      };
      
      console.log('✅ Check In SUCCESS:', fakeResponse);
      return fakeResponse;
    } catch (error) {
      console.error('❌ Check In FAILED:', error);
      return rejectWithValue(error.response?.data || 'Check In failed');
    }
  }
);

// Mock checkOut API call
export const checkOut = createAsyncThunk(
  'attendance/checkOut',
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log('🚀 Check Out API Called!');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fakeResponse = {
        success: true,
        status: 'present',
        checkOutTime: new Date().toISOString(),
        message: 'Checked out successfully at ' + new Date().toLocaleTimeString()
      };
      
      console.log('✅ Check Out SUCCESS:', fakeResponse);
      return fakeResponse;
    } catch (error) {
      console.error('❌ Check Out FAILED:', error);
      return rejectWithValue(error.response?.data || 'Check Out failed');
    }
  }
);

// Mock fetch dashboard data
export const fetchEmployeeDashboard = createAsyncThunk(
  'attendance/fetchEmployeeDashboard',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📊 Fetching Dashboard Data...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fakeDashboardData = {
        todayStatus: {
          status: 'not-checked-in',
          checkInTime: null,
          checkOutTime: null
        },
        monthlyStats: {
          presentDays: 18,
          lateDays: 2,
          attendanceRate: 90.5
        },
        recentAttendance: [
          {
            date: '2025-11-29',
            checkInTime: '09:15 AM',
            checkOutTime: '06:30 PM',
            status: 'present'
          },
          {
            date: '2025-11-28',
            checkInTime: '09:05 AM',
            checkOutTime: '05:45 PM',
            status: 'present'
          },
          {
            date: '2025-11-27',
            checkInTime: '09:45 AM',
            checkOutTime: '06:15 PM',
            status: 'late'
          }
        ]
      };
      
      console.log('✅ Dashboard Data Loaded:', fakeDashboardData);
      return fakeDashboardData;
    } catch (error) {
      console.error('❌ Dashboard fetch FAILED:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch dashboard');
    }
  }
);

const initialState = {
  employeeDashboard: null,
  todayStatus: null,
  loading: false,
  error: null
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Check In
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('⏳ Check In Loading...');
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStatus = action.payload;
        state.employeeDashboard = {
          ...state.employeeDashboard,
          todayStatus: action.payload
        };
        console.log('🎉 Check In SUCCESSFULLY COMPLETED!');
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('❌ Check In ERROR:', action.payload);
      })

      // Check Out
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('⏳ Check Out Loading...');
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStatus = action.payload;
        state.employeeDashboard = {
          ...state.employeeDashboard,
          todayStatus: action.payload
        };
        console.log('🎉 Check Out SUCCESSFULLY COMPLETED!');
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('❌ Check Out ERROR:', action.payload);
      })

      // Fetch Dashboard
      .addCase(fetchEmployeeDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeDashboard = action.payload;
        state.todayStatus = action.payload.todayStatus;
      })
      .addCase(fetchEmployeeDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
