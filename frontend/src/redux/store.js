import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice.js";
import adminUserReducer from "./admin/adminUserSlice.js";
import adminSongReducer from "./admin/adminSongSlice.js";
import adminArtistReducer from "./admin/adminArtistSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUser: adminUserReducer,
    adminSongs: adminSongReducer,
    adminArtist: adminArtistReducer,
  },
});

export default store;
