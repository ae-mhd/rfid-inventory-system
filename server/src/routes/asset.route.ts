import express from "express";

import {
  createAsset,
  deleteAsset,
  getAssets,
  getAsset,
  updateAsset,
} from "../controllers/asset.controller";

const router = express.Router();
router.get("/", getAssets).post("/", createAsset);

router
  .get("/:id", getAsset)
  .put("/:id", updateAsset)
  .delete("/:id", deleteAsset);

export default router;
