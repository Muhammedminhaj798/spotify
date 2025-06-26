import express from "express";
import tryCatch from "../utils/trycatch.js";
import addPlaylist, {  deletePlaylist, getPlaylists } from "../controller/user/playlistController.js";
import user_auth from "../middleware/authmiddleWare.js";

const userRoutes = express.Router();

userRoutes
    .post("/addPlaylist", user_auth, tryCatch(addPlaylist))
    .get("/getPlaylist",user_auth,tryCatch(getPlaylists))
    .get("getAllPlaylist",tryCatch(deletePlaylist))
    // .delete("/deletePlaylist",user_auth,tryCatch(delete))

export default userRoutes;
