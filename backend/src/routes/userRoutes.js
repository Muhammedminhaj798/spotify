import express from "express";
import tryCatch from "../utils/trycatch.js";
import addPlaylist from "../controller/user/playlistController.js";
import user_auth from "../middleware/authmiddleWare.js";

const userRoutes = express.Router();

userRoutes.post("/addPlaylist", user_auth, tryCatch(addPlaylist));

export default userRoutes;
