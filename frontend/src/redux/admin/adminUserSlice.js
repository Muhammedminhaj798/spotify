import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

const initialState = {
  users: [],
  loading: false,
  error:null
};

export const getAllUsers = createAsyncThunk(
  "adminUser/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/getAllUser");
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllUsers.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(getAllUsers.fulfilled, (state,action)=>{
        state.loading = false;
        state.users = action.payload;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
    })
  },
});

export default adminUserSlice.reducer;
