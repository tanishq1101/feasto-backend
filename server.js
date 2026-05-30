import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import restaurantAdminRouter from "./routes/restaurantAdminRoute.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import { corsOptions } from "./config/cors.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for image uploads
app.use("/images", express.static(path.join(__dirname, "./uploads")));

// Connect DB
connectDB();

// API routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/admin/restaurants", restaurantAdminRouter);

// Health route
app.get("/", (req, res) => {
  res.send("Local Backend Server Running on http://localhost:4000");
});

// Enable local server
app.listen(port, () => {
  console.log(`🚀 Local backend running at http://localhost:${port}`);
});
