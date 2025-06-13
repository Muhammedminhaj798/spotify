import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

// Async thunk for registering user
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
      return rejectWithValue(error);
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

const initialState = {
  user: null,
  loading: false,
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
      });
  },
});

export const { updateFormData, resetFormData, resetAuthState, clearError } =
  authSlice.actions;
export default authSlice.reducer;
