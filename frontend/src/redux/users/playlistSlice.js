import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosInstance from "../../AxiosInstance";

const initialState = {
  playlists: [],
  loading: false,
  error: null,
};

export const addPlaylist = createAsyncThunk(
  "playlist/addPlaylist",
  async ({ name, description }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("user"); // Adjust 'user' to match your cookie name
      if (!token) {
        throw new Error("No authentication token found in cookies");
      }
      const response = await axiosInstance.post(
        "/user/addPlaylist",
        { name, description },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPlaylist = createAsyncThunk(
  "playlist/getPlaylist",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("user");
      if (!token) {
        throw new Error("No authentication token found in cookies");
      }
      const response = await axiosInstance.get("/user/getPlaylist", {
        headers: {
          authorization: `Bearer ${token}`,
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
      })
      .addCase(addPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.playlists = [...state.playlists, action.payload.data?.playlist || action.payload];
      })
      .addCase(addPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Failed to add playlist";
      });
  },
});

export default playlistSlice.reducer;