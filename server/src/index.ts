import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.route";
import { errorHandler } from "./middleware/errorHandler";
import AppError from "./utils/AppError";
import { connectToDatabase } from "./config/database";
import centerRoutes from "./routes/center.route";
import floorRoutes from "./routes/floor.route";
import wingRoutes from "./routes/wing.route";
import officesRoutes from "./routes/office.route";
import assetCategoriesRoutes from "./routes/assetCategory.route";
import assetInstanceRoutes from "./routes/assetInstance.route";
import assetsRoutes from "./routes/asset.route";
import path from "path";

connectToDatabase();
const app = express();
app.use(
  express.json({
    limit: "10mb", // Adjust the limit as needed
  })
);
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb", // Adjust the limit as needed
  })
);

app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/centers", centerRoutes);
app.use("/api/v1/floors", floorRoutes);
app.use("/api/v1/wings", wingRoutes);
app.use("/api/v1/offices", officesRoutes);
app.use("/api/v1/assets", assetsRoutes);
app.use("/api/v1/asset-categories", assetCategoriesRoutes);
app.use("/api/v1/asset-instance", assetInstanceRoutes);

app.all("*", (req, res, next) => {
  return next(new AppError("Route not found", 404));
});
app.use(errorHandler);
app.listen(7000, () => {
  console.log("Server started on port 7000");
});
