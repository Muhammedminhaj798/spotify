import express from "express";
import tryCatch from "../utils/trycatch.js";
import {
  blockUser,
  getAllUsers,
  getUSerById,
  unblockUser,
} from "../controller/admin/adminUsers.js";
// import getAllusers from "../controller/admin/adminUsers.js";

const adminRoutes = express.Router();

adminRoutes
  .get("/getAllUser", tryCatch(getAllUsers))
  .get("/getUserById/:id", tryCatch(getUSerById))

  .patch("/userblock/:id", tryCatch(blockUser))
  .patch('/userUnblock/:id', tryCatch(unblockUser))

export default adminRoutes;
