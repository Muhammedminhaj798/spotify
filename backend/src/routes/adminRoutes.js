import express from "express";
import tryCatch from "../utils/trycatch.js";
import { getAllUsers, getUSerById , toggleBlockUser } from "../controller/admin/adminUsers.js";
import addSongs, { getAllSongs } from "../controller/admin/adminSongs.js";
import upload from "../middleware/uploadMiddleware.js";

const adminRoutes = express.Router();
console.log(upload);

adminRoutes
  .get("/getAllUser", tryCatch(getAllUsers))
  .get("/getUserById/:id", tryCatch(getUSerById)) 
  .patch("/toggleBlockUser/:id", tryCatch(toggleBlockUser))

  //songs routes
  
  .post("/addSongs", upload, tryCatch(addSongs))
  .get('/getAllSongs',tryCatch(getAllSongs))

export default adminRoutes;