import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice.js";
import adminUserReducer from "./admin/adminUserSlice.js";
import adminSongReducer from "./admin/adminSongSlice.js";
import adminArtistReducer from "./admin/adminArtistSlice.js";
import adminLoginReducer from './admin/adminAuthSlice.js';
import userPlaylistReducer from "./users/playlistSlice.js"
import playSongReducer from "./users/playSong.js"
import artistSongReducer from './users/ArtistSlice.js'
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUser: adminUserReducer,
    adminSongs: adminSongReducer,
    adminArtist: adminArtistReducer,
    adminAuth: adminLoginReducer,
    userPlaylist: userPlaylistReducer,
    playSong:playSongReducer,
    artist:artistSongReducer
  },
});

export default store;
