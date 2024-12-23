import mongoose from "mongoose";
import { IAssetCategory } from "../utils/types";

const assetCategorySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true }, // رمز التصنيف
    name: { type: String, required: true, unique: true }, // اسم التصنيف
    type: {
      type: String,
      enum: ["fixed", "degital", "movable", "consumable", "furniture"],
      // default: "fixed",
    }, // نوع التصنيف
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

assetCategorySchema.virtual("assets", {
  ref: "Asset",
  localField: "_id",
  foreignField: "category",
});
const AssetCategory = mongoose.model<IAssetCategory>(
  "AssetCategory",
  assetCategorySchema
);
export default AssetCategory;
