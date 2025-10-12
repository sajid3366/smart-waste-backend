import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/auth/health", (req, res) =>
  res.json({ status: "ok", service: "auth" })
);
app.get("/", (req, res) => res.send("Smart Waste [auth] is running properly"));

// ✅ Mount routes
app.use("/auth", authRoutes);

// ✅ Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Auth service running on port ${PORT}`);
});
export default app
