import AssetCategory from "../models/assetCategory.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlersFactory";

export const createAssetCategory = createOne(AssetCategory);
export const updateAssetCategory = updateOne(AssetCategory);
export const deleteAssetCategory = deleteOne(AssetCategory);
export const getAssetCategories = getAll(AssetCategory, ["name"], [], "assets");
export const getAssetCategory = getOne(AssetCategory);
