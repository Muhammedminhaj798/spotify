import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";
import Cookies from "js-cookie"; // Import js-cookie to access cookies

const initialState = {
  playlists: [],
  loading: false,
  error: null,
};

export const getPlaylist = createAsyncThunk(
  "playlist/getPlaylist",
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve token from cookies
      const token = Cookies.get("user"); // Adjust 'token' to match your cookie name

      // Validate token
      if (!token) {
        throw new Error("No authentication token found in cookies");
      }

      const response = await axiosInstance.get("/user/getPlaylist", {
        headers: {
          authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch playlists");
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.playlists = action.payload;
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default playlistSlice.reducer;