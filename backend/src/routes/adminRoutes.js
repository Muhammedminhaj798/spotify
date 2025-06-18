import express from "express";
import tryCatch from "../utils/trycatch.js";
import { getAllUsers, getUSerById, toggleBlockUser } from "../controller/admin/adminUsers.js";
// import getAllusers from "../controller/admin/adminUsers.js";

const adminRoutes = express.Router();

adminRoutes
  .get("/getAllUser", tryCatch(getAllUsers))
  .get("/getUserById/:id", tryCatch(getUSerById))

  .patch("/toggleBlockUser/:id", tryCatch(toggleBlockUser))

export default adminRoutes;
