import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

const initialState = {
  loading: false,
  error: null,
  artistData: null,
};

export const getArtistSongById = createAsyncThunk(
  "artist/getArtistSongById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/getArtistSongById/${id}`);
      return response.data.data; // Extract the data object from response
    } catch (error) {
        console.log("error is ", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    clearArtistData: (state) => {
      state.artistData = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArtistSongById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArtistSongById.fulfilled, (state, action) => {
        state.loading = false;
        state.artistData = action.payload;
        state.error = null;
      })
      .addCase(getArtistSongById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.artistData = null;
      });
  },
});

export const { clearArtistData, clearError } = artistSlice.actions;
export default artistSlice.reducer;
