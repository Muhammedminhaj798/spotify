import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

const initialState = {
  isAuth: false,
  loading: false,
  error: null,
  data: [],
};

export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Validate inputs
      if (!email || !password) {
        return rejectWithValue({ message: "Email and password are required" });
      }

      const response = await axiosInstance.post("admin/adminLogin", {
        email,
        password,
      });

      return response.data; // Contains { token, message }
    } catch (error) {
      // Handle server and network errors
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Network error or server is down" });
    }
  }
);
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuth = true;
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("isAdmin", JSON.stringify(action.payload));
        localStorage.setItem("admin_token", JSON.stringify(action.payload));
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});
export default adminAuthSlice.reducer;
