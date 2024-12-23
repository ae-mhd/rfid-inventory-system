import express from "express";

import {
  createAssetInstance,
  deleteAssetInstance,
  getAssetInstances,
  getAssetInstance,
  updateAssetInstance,
} from "../controllers/assetInstance.controller";
import multer from "multer";
import {
  resizeImages,
  uploadMultipleImages,
} from "../middleware/uploadImage.middleware";

const router = express.Router();

router
  .get(
    "/",

    getAssetInstances
  )
  .post(
    "/",
    uploadMultipleImages([{ name: "image", maxCount: 1 }]),
    resizeImages("images", "image"),
    createAssetInstance
  );

router
  .get("/:id", getAssetInstance)
  .put("/:id", updateAssetInstance)
  .delete("/:id", deleteAssetInstance);

export default router;
