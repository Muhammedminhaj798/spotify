// redux/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for registering user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userInfo, { rejectWithValue }) => {
   try {
      const { data } = await axiosInstance.post("auth/register", userInfo);
      return data.user; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  // formData: {
  //   email: "",
  //   password: "",
  //   name: "",
  //   year: "",
  //   month: "",
  //   day: "",
  //   gender: "",
  //   marketingOptOut: false,
  //   dataSharing: false,
  // },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // updateFormData: (state, action) => {
    //   state.formData = { ...state.formData, ...action.payload };
    // },
    // resetFormData: (state) => {
    //   state.formData = initialState.formData;
    // },
    // resetAuthState: (state) => {
    //   state.user = null;
    //   state.loading = false;
    //   state.error = null;
    //   state.formData = initialState.formData;
    // },
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;