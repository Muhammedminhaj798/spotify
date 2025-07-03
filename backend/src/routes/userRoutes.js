import express from "express";
import tryCatch from "../utils/trycatch.js";
import addPlaylist, {  addSongPlaylist, deletePlaylist, getPlaylists, playlistById } from "../controller/user/playlistController.js";
import user_auth from "../middleware/authmiddleWare.js";
import upload from "../middleware/uploadMiddleware.js";

const userRoutes = express.Router();

userRoutes
    .post("/addPlaylist", user_auth, tryCatch(addPlaylist))
    .get("/getPlaylist",user_auth,tryCatch(getPlaylists))
    .get("getAllPlaylist",tryCatch(deletePlaylist))
    .get('/playlistById/:id',user_auth,tryCatch(playlistById))
    .post('/addSongPlaylist/:id', user_auth,tryCatch(addSongPlaylist))
    // .delete("/deletePlaylist",user_auth,tryCatch(delete))

export default userRoutes;
