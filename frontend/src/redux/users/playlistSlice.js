import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosInstance from "../../AxiosInstance";

const initialState = {
  playlists: [],
  playlistById: [],
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

export const fetchPlaylistById = createAsyncThunk(
  "playlist/playlistById",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("user"); // Adjust 'user' to match your cookie name
      const response = await axiosInstance.get(`/user/playlistById/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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

export const addSongPlaylist = createAsyncThunk(
  "playlist/addSongPlaylist",
  async ({ playlistId, songId }, { rejectWithValue }) => {
    try {
      console.log(playlistId, songId);
      const token = Cookies.get("user");
      const response = await axiosInstance.post(
        `/user/addSongPlaylist/${playlistId}`,
        {
          songId: songId,
        },
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

export const removeSongPlaylist = createAsyncThunk(
  "playlist/removeSongPlaylist",
  async ({ playlistId, songId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("user");
      const response = await axiosInstance.delete(
        `/removeSongPlaylist/${playlistId}`,
        {
          songId: songId,
        },
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
        state.playlists = [
          ...state.playlists,
          action.payload.data?.playlist || action.payload,
        ];
      })
      .addCase(addPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Failed to add playlist";
      })
      .addCase(fetchPlaylistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.playlistById = action.payload.data;
      })
      .addCase(addSongPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSongPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.playlistById = [...state.playlistById, action.payload.data];
      })
      .addCase(addSongPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message ||
          action.payload ||
          "Failed to add song to playlist";
      });
    // .addCase(removeSongPlaylist.pending, (state)=> {
    //   state.loading = true;
    //   state.error = null
    // })
    // .addCase(removeSongPlaylist.fulfilled, (state) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.playlistById
    // })
  },
});

export default playlistSlice.reducer;
