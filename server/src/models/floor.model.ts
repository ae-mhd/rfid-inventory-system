import mongoose from "mongoose";
import { IFloor } from "../utils/types";

const FloorSchema = new mongoose.Schema(
  {
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center",
      required: true,
    }, // المركز المرتبط
    name: { type: String, required: true, unique: true }, // اسم الطابق
    floorNumber: { type: Number, required: true }, // رقم الطابق
    code: { type: String, required: true, unique: true }, // رمز الطابق
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

FloorSchema.virtual("wings", {
  ref: "Wing",
  localField: "_id",
  foreignField: "floor",
});
// Add a virtual property for wingCount
FloorSchema.virtual("wingCount", {
  ref: "Wing", // The model to use
  localField: "_id", // The field in the Center schema
  foreignField: "floor", // The field in the Floor schema that references the Center
  count: true, // Specify that this virtual is for counting
});
const Floor = mongoose.model<IFloor>("Floor", FloorSchema);
export default Floor;
