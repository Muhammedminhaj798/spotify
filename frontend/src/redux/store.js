import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice.js";
import adminUserReducer from "./admin/adminUserSlice.js";
import adminSongReducer from "./admin/adminSongSlice.js";
import adminArtistReducer from "./admin/adminArtistSlice.js";
import adminLoginReducer from './admin/adminAuthSlice.js';
import userPlaylistReducer from "./users/playlistSlice.js"
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUser: adminUserReducer,
    adminSongs: adminSongReducer,
    adminArtist: adminArtistReducer,
    adminAuth: adminLoginReducer,
    userPlaylist: userPlaylistReducer
  },
});

export default store;
