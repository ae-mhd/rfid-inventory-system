import mongoose from "mongoose";
import { ICenter } from "../utils/types";

const centerSchema = new mongoose.Schema<ICenter>(
  {
    name: { type: String, required: true }, // اسم المركز
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
centerSchema.virtual("floors", {
  ref: "Floor",
  localField: "_id",
  foreignField: "center",
});

centerSchema.virtual("floorCount", {
  ref: "Floor",
  localField: "_id",
  foreignField: "center",
  count: true,
});

const Center = mongoose.model<ICenter>("Center", centerSchema);
export default Center;
