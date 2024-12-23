import Asset from "../models/asset.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlersFactory";

export const createAsset = createOne(Asset);
export const updateAsset = updateOne(Asset);
export const deleteAsset = deleteOne(Asset);
export const getAssets = getAll(Asset, ["name", "code"], [], "instances");
export const getAsset = getOne(Asset);
