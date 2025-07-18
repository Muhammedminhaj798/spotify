import express from "express";
import tryCatch from "../utils/trycatch.js";
import {
  getAllUsers,
  getUSerById,
  toggleBlockUser,
} from "../controller/admin/adminUsers.js";
import addSongs, {
  getAllSongs,
  toggleDeleted,
} from "../controller/admin/adminSongs.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  addArtist,
  disableArstist,
  getAllArtist,
  toggleDisableArtist,
  updatedArtist,
} from "../controller/admin/adminArtist.js";
import { adminLogin } from "../controller/admin/adminLogin.js";

const adminRoutes = express.Router();
console.log(upload);

adminRoutes
  .post("/adminLogin", tryCatch(adminLogin))
  .get("/getAllUser", tryCatch(getAllUsers))
  .get("/getUserById/:id", tryCatch(getUSerById))
  .patch("/toggleBlockUser/:id", tryCatch(toggleBlockUser))
  .patch("/toggleDeleted/:id", tryCatch(toggleDeleted))

  //songs routes

  .post("/addSongs", upload, tryCatch(addSongs))
  .get("/getAllSongs", tryCatch(getAllSongs))

  //artist routes
  .post("/addArtist", upload, tryCatch(addArtist))
  .get("/getAllArtist", tryCatch(getAllArtist))
  .patch("/disableArtist/:id", tryCatch(disableArstist))
  .patch("/toggleDisableArtist/:id", tryCatch(toggleDisableArtist))
  .patch("/updatedArtist/:id", upload, tryCatch(updatedArtist));

export default adminRoutes;
