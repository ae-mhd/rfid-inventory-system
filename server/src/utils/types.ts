import mongoose from "mongoose";

export interface ICenter extends Document {
  name: string;
  // floors: mongoose.Types.ObjectId[];
  // floorCount: number;
}

export interface IFloor extends Document {
  center: mongoose.Types.ObjectId;
  name: string;
  floorNumber: number;
  code: string;
  wings: mongoose.Types.ObjectId[];
  wingCount: number;
}

export interface IWing extends Document {
  floor: mongoose.Types.ObjectId;
  name: string;
  wingNumber: number;
  code: string;
  offices: mongoose.Types.ObjectId[];
  officeCount: number;
}

export interface IOffice extends Document {
  wing: mongoose.Types.ObjectId;
  name: string;
  officeNumber: number;
  code: string;
  employeeCount: number;
  assets: mongoose.Types.ObjectId[];
}

export interface IAssetCategory extends Document {
  code: string;
  name: string;
  type: string;
}

export interface IAsset extends Document {
  code: string;
  name: string;
  category: mongoose.Types.ObjectId;
  instances: mongoose.Types.ObjectId[];
}

export interface IAssetInstance extends Document {
  name: string;
  code: string;
  serialNumber: string;
  stockNumber: string;
  asset: mongoose.Types.ObjectId;
  office: mongoose.Types.ObjectId;
  purchaseDate?: Date;
  status: string;
  image?: string;
}
