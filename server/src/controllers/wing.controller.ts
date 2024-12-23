import { NextFunction, Request, Response } from "express";
import Wing from "../models/wing.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlersFactory";
import { asyncHandler } from "../utils/helpers";
import Floor from "../models/floor.model";
import AppError from "../utils/AppError";
import ApiFeatures from "../utils/apiFeatures";
import mongoose from "mongoose";

export const createWing = createOne(Wing);
export const updateWing = updateOne(Wing);
export const deleteWing = deleteOne(Wing);
// export const getWings = getAll(Wing, ["name"], [], "offices officeCount");
export const getWing = getOne(Wing, "", "offices officeCount");

export const getWings = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const initialPopulate = ["offices", "officeCount"];
    const searchFields = ["name"];
    let initialQuery: { [key: string]: any } = {};
    if (req.query.center) {
      const centerId = req.query.center as string;
      // Step 1: Find all floors for the given center
      const floors = await Floor.find({ center: centerId }).select("_id");
      // Step 2: Find all wings for the found floors
      const floorIds = floors.map((floor) => floor._id);
      initialQuery = { floor: { $in: floorIds } };
    }

    const initialMongooseQuery = Wing.find().sort("-createdAt");
    const countDocuments = await Wing.countDocuments();

    // // Execute the query
    const apiFeatures = new ApiFeatures(initialMongooseQuery, req.query)
      .filter(["center"], initialQuery)
      .sort()
      .paginate(countDocuments)
      .search(searchFields)
      .limitFields()
      .populate(initialPopulate);

    const { paginationResult, mongooseQuery } = apiFeatures;
    // // Debug: Log the query after applying features
    // // unselect excludedFields
    // const fields = excludedFields.map((field) => `-${field}`).join(" ");
    // mongooseQuery.select(fields);

    // build mongoose query

    const wings = await mongooseQuery.select("-__v");

    res.status(200).json({
      status: "success",
      data: wings,
      pagination: paginationResult,
      total: wings.length,
    });
  }
);
