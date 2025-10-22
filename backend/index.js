import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRouetes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS setup for frontend communication + credentials
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Database Connection
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", contactRouetes);

// ✅ Health check route (Optional, good for monitoring)
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// ✅ Start Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
