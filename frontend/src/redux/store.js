import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice.js";
import adminUserReducer from "./admin/adminUserSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUser: adminUserReducer,
  },
});

export default store;
