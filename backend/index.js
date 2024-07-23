import express from "express";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/tasks.js";

import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://fnax-task2.vercel.app",
  })
);

connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
