import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../AxiosInstance";

const INITIAL_STATE = {
  user: {},
  loading: false,
  error: null,
};

const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("auth/register", userInfo);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: null,
  extraReducers: (builder) => {
    builder
        .
  }
});
