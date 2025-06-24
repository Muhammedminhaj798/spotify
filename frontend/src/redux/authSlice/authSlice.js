import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

const userDetails = localStorage.getItem("user");

const initialState = {
  user: null,
  loading: false,
  currentUser: userDetails ? JSON.parse(userDetails) : null,
  isAuth: localStorage.getItem("isAuth") === "true" || false,
  error: null,
  formData: {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    DOB: "",
    gender: "",
  },
};
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { formData },
      } = getState(); // Get formData from Redux state
      const { data } = await axiosInstance.post("/auth/register", formData);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
export const sentOTP = createAsyncThunk(
  "auth/sentOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/sendOTP", { email });
      return response.data;
    } catch (error) {
      // Extract error message from backend response, if available
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status || 500,
      });
    }
  }
);
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verifyOTP", credential);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.formData = initialState.formData;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.formData = initialState.formData; // Reset form data after successful registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
      });
  },
});

export const { updateFormData, resetFormData, resetAuthState, clearError } =
  authSlice.actions;
export default authSlice.reducer;
