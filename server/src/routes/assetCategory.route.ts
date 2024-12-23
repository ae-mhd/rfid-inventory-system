import express from "express";

import {
  createAssetCategory,
  deleteAssetCategory,
  getAssetCategories,
  getAssetCategory,
  updateAssetCategory,
} from "../controllers/assetCategory.controller";

const router = express.Router();

router.get("/", getAssetCategories).post("/", createAssetCategory);

router
  .get("/:id", getAssetCategory)
  .put("/:id", updateAssetCategory)
  .delete("/:id", deleteAssetCategory);

export default router;
