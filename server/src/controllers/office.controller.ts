import Office from "../models/office.model";
import { NextFunction, Request, Response } from "express";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlersFactory";
import { asyncHandler } from "../utils/helpers";
import Wing from "../models/wing.model";
import AppError from "../utils/AppError";

// export const createOffice = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { wing: wingId }: { wing: string } = req.body;
//     const wing = await Wing.findById(wingId);
//     if (!wing) {
//       return next(new AppError("Wing not found", 404));
//     }

//     const office = await Office.create(req.body);

//     wing.offices.push(office._id);
//     await wing.save();

//     res.status(201).json({
//       status: "success",
//       message: "Floor created successfully",
//       data: office,
//     });
//   }
// );
export const createOffice = createOne(Office);
export const updateOffice = updateOne(Office);
export const deleteOffice = deleteOne(Office);
export const getOffices = getAll(Office, ["name"], [], "instances");
export const getOffice = getOne(Office, "", "instances");
