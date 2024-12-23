import mongoose from "mongoose";
import { IOffice } from "../utils/types";

const officeSchema = new mongoose.Schema(
  {
    wing: { type: mongoose.Schema.Types.ObjectId, ref: "Wing", required: true }, // الجناح المرتبط
    name: { type: String, required: true }, // اسم المكتب
    officeNumber: { type: Number, required: true, unique: true }, // رقم المكتب
    code: { type: String, required: true, unique: true }, // رمز المكتب
    employeeCount: { type: Number, required: true, default: 0 },
    // instances: [{ type: mongoose.Schema.Types.ObjectId, ref: "AssetInstance" }], // قائمة بالأصول
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

officeSchema.virtual("instances", {
  ref: "AssetInstance",
  localField: "_id",
  foreignField: "office",
});
const Office = mongoose.model<IOffice>("Office", officeSchema);
export default Office;
