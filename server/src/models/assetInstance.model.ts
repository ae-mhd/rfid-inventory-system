import mongoose from "mongoose";
import { IAssetInstance } from "../utils/types";

const assetInstanceSchema = new mongoose.Schema<IAssetInstance>({
  name: { type: String, required: true }, // اسم العينة
  code: { type: String, required: true, unique: true }, // رمز العينة
  serialNumber: { type: String, required: true, unique: true }, // الرقم التسلسلي
  stockNumber: { type: String, required: true }, // رقم الجرد
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true }, // الأصل المرتبط
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Office",
    required: true,
  }, // المكتب المرتبط
  purchaseDate: { type: Date }, // تاريخ الشراء
  status: {
    type: String,
    enum: ["new", "used", "maintenance"],
    default: "new",
  }, // حالة العينة
  image: { type: String }, // صورة أو ملف
});
const setImagesUrl = (doc: IAssetInstance) => {
  if (doc.image) {
    const imgUrl = `${process.env.BASE_URL}/images/${doc.image}`;
    doc.image = imgUrl;
  }
};

assetInstanceSchema.post("init", (doc) => setImagesUrl(doc));
assetInstanceSchema.post("save", (doc) => setImagesUrl(doc));
const AssetInstance = mongoose.model<IAssetInstance>(
  "AssetInstance",
  assetInstanceSchema
);
export default AssetInstance;
