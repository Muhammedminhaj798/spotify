import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk(
  "adminUser/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/getAllUser");
      return response.data.users;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const toggleBlockUser = createAsyncThunk(
  "adminUser/toggleBlockUser",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/toggleBlockUser/${id}`,
        {
          isBlocked: !currentStatus,
        }
      );
      // Return the updated user data with the new blocked status
      return {
        userId: id,
        isBlocked: !currentStatus,
        updatedUser: response.data.data,
      };
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleBlockUser.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleBlockUser.fulfilled, (state, action) => {
        const { userId, isBlocked, updatedUser } = action.payload;

        state.users = state.users.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              isBlocked: isBlocked,
              ...(updatedUser && typeof updatedUser === "object"
                ? updatedUser
                : {}),
            };
          }
          return user;
        });
      })
      .addCase(toggleBlockUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminUserSlice.actions;
export default adminUserSlice.reducer;
