import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

const initialState = {
  artists: [],
  loading: false,
  error: null,
};

export const getAllArtist = createAsyncThunk(
  "adminArtist/getAllArtist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/getAllArtist");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleDisableArtist = createAsyncThunk(
  "adminArtist/toggleDisableArtist",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `admin/toggleDisableArtist/${id}`,
        {
          isDisabled: !currentStatus,
        }
      );
      return {
        userId: id,
        isDisabled: !currentStatus,
        updatedUser: response.data,
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

const adminArtistSlice = createSlice({
  name: "adminArtist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
        state.error = null;
      })
      .addCase(getAllArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminArtistSlice.reducer;
