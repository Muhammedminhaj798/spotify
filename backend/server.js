import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./src/routes/authRoute.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import ErrorManager from "./src/middleware/ErrorManager.js";
import userRoutes from "./src/routes/userRoutes.js";
// import userRoutes from "./src/routes/adminRoutes.js";

const app = express();
dotenv.config();


app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  })
);


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use("/api/auth", authRouter);
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)


mongoose
  .connect(process.env.MONGOOSE)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
  app.use(ErrorManager)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});