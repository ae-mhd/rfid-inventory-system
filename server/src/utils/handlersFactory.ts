import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import { asyncHandler } from "./helpers";
import mongoose, { Model } from "mongoose";
import ApiFeatures from "./apiFeatures";

export const getOne = (
  model: Model<any>,
  select: string = "",
  initialPopulate: string = ""
) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const doc = await model
        .findById(id)
        .select(select)
        .populate(initialPopulate)
        .select("-__v");
      if (!doc) {
        return next(new AppError(`No document found with that ID: ${id}`, 404));
      }
      res.status(200).json({
        status: "success",
        data: doc,
      });
    }
  );
};

export const createOne = (model: Model<any>) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const doc = await model.create(req.body);
      res.status(201).json({
        status: "success",
        message: "Created successfully",
        data: doc,
      });
    }
  );
};

export const updateOne = (model: Model<any>, excludedFields: string[] = []) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return next(new AppError(`Invalid Document ID: ${id}`, 500));
      }
      const fields = excludedFields.map((field) => `-${field}`).join(" ");
      const doc = await model
        .findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        .select(fields);
      if (!doc) {
        return next(new AppError(`No document found with that ID: ${id}`, 404));
      }
      res.status(200).json({
        status: "success",
        message: "Document updated successfully",
        data: doc,
      });
    }
  );
};

export const deleteOne = (model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const doc = await model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppError(`No document found with that ID: ${id}`, 404));
    }
    res.status(200).send();
  });
export const getAll = (
  model: Model<any>,
  searchFields: string[] = [""],
  excludedFields: string[] = [],
  initialPopulate: string = ""
) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const countDocuments = await model.countDocuments();
      const initialMongooseQuery = model.find().sort("-createdAt");
      if (initialPopulate) {
        initialMongooseQuery.populate(initialPopulate);
      }
      // Debug: Log the initial query
      // console.log("Initial Query:", req.query);

      // Execute the query
      const apiFeatures = new ApiFeatures(initialMongooseQuery, req.query)
        .filter()
        .sort()
        .paginate(countDocuments)
        .search(searchFields)
        .limitFields(excludedFields)
        .populate();

      const { paginationResult, mongooseQuery } = apiFeatures;
      // Debug: Log the query after applying features
      // unselect excludedFields
      const fields = excludedFields.map((field) => `-${field}`).join(" ");
      mongooseQuery.select(fields);

      // build mongoose query
      const docs = await mongooseQuery.select("-__v");

      res.status(200).json({
        status: "success",
        data: docs,
        pagination: paginationResult,
        total: docs.length,
      });
    }
  );
};
