import mongoose from "mongoose";
import { IAsset } from "../utils/types";

const AssetSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // رمز الأصل
  name: { type: String, required: true }, // اسم الأصل
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssetCategory",
    required: true,
  }, // التصنيف المرتبط
  // instances: [{ type: mongoose.Schema.Types.ObjectId, ref: "AssetInstance" }], // عينات الأصل
});
AssetSchema.virtual("instances", {
  ref: "AssetInstance",
  localField: "_id",
  foreignField: "asset",
});
const Asset = mongoose.model<IAsset>("Asset", AssetSchema);
export default Asset;
