import express from "express";
import tryCatch from "../utils/trycatch.js";
import addPlaylist, { addSongPlaylist, deletePlaylist, getPlaylists, playlistById, removeSongPlaylist } from "../controller/user/playlistController.js";
import user_auth from "../middleware/authmiddleWare.js";
import { getSearchController } from "../controller/user/searchController.js";
import { getArtistSongById } from "../controller/user/ArtistController.js";

const userRoutes = express.Router();

userRoutes
    .post("/addPlaylist", user_auth, tryCatch(addPlaylist))
    .get("/getPlaylist", user_auth, tryCatch(getPlaylists))
    .get("getAllPlaylist", tryCatch(deletePlaylist))
    .get('/playlistById/:id', user_auth, tryCatch(playlistById))
    .post('/addSongPlaylist/:id', user_auth, tryCatch(addSongPlaylist))
    .delete('/removeSongPlaylist/:id', user_auth, tryCatch(removeSongPlaylist))
    .get('/searchBar', tryCatch(getSearchController))
    .get('/getArtistSongById/:id', tryCatch(getArtistSongById))
    .delete("/deletePlaylist/:id", user_auth, tryCatch(deletePlaylist))

export default userRoutes;
