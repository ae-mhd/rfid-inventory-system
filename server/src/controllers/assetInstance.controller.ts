import AssetInstance from "../models/assetInstance.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlersFactory";

export const createAssetInstance = createOne(AssetInstance);
export const updateAssetInstance = updateOne(AssetInstance);
export const deleteAssetInstance = deleteOne(AssetInstance);
export const getAssetInstances = getAll(AssetInstance);
export const getAssetInstance = getOne(AssetInstance);
