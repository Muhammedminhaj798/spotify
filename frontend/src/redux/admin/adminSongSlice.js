import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

const initialState = {
  songs: [],
  loading: false,
  error: null,
};
export const getAllSongs = createAsyncThunk(
  "songs/getAllSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/getAllSongs");
      return response.data.songs;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addSong = createAsyncThunk(
  "songs/addSong",
  async (songData, { rejectWithValue }) => {
    try {
      songData.forEach((key, value) => {
        console.log(key, value);
      });
      const response = await axiosInstance.post("admin/addSongs", songData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response", response);

      return response.data.song;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  }
);

export const DeletedSong = createAsyncThunk(
  "songs/tDeletedSong",
  async (id , { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`admin/toggleDeleted/${id}`);

      return {
        userId: id,
        updatedUser: response.data.song,
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

const adminSongSlice = createSlice({
  name: "adminSong",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(getAllSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSong.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(addSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminSongSlice.actions;
export default adminSongSlice.reducer;
