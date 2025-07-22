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

export const addArtist = createAsyncThunk(
  "adminArtist/addArtist",
  async (artist, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("admin/addArtist", artist, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
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

// export const updatedArtist = createAsyncThunk(
//   "adminArtist/updatedArtist",
//   async ({ formData, id }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": formData ? "multipart/form-data" : "application/json",
//         },
//       };

//       if ((!image, !name)) {
//         return rejectWithValue("Please fill all fields");
//       }
//       const response = await axiosInstance.patch(
//         `admin/updatedArtist/${id}`,
//         formData,
//         config
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const updatedArtist = createAsyncThunk(
  "adminArtist/updatedArtist",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      // Validate input
      if (!data) {
        return rejectWithValue("No data provided");
      }

      const config = {
        headers: {
          "Content-Type":
            data instanceof FormData
              ? "multipart/form-data"
              : "application/json",
        },
      };

      const response = await axiosInstance.patch(
        `admin/updatedArtist/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
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
      })
      .addCase(updatedArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatedArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = state.artists.map((artist) =>
          artist._id === action.payload.data._id ? action.payload.data : artist
        );
        state.error = null;
      })
      .addCase(updatedArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminArtistSlice.reducer;
