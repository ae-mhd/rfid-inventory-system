import mongoose from "mongoose";
import { IWing } from "../utils/types";

const wingSchema = new mongoose.Schema(
  {
    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    }, // الطابق المرتبط
    name: { type: String, required: true }, // اسم الجناح
    wingNumber: { type: Number, required: true }, // رقم الجناح
    code: { type: String, required: true, unique: true }, // رمز الجناح
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

wingSchema.virtual("offices", {
  ref: "Office",
  localField: "_id",
  foreignField: "wing",
});
// Add a virtual property for wingCount
wingSchema.virtual("officeCount", {
  ref: "Office",
  localField: "_id",
  foreignField: "wing",
  count: true,
});

const Wing = mongoose.model<IWing>("Wing", wingSchema);
export default Wing;
