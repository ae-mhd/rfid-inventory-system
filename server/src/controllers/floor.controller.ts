import Floor from "../models/floor.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlersFactory";

// export const createFloor = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { center: centerId }: { center: string } = req.body;
//     const center = await Center.findById(centerId);
//     if (!center) {
//       return next(new AppError("Center not found", 404));
//     }

//     const floor = await Floor.create(req.body);

//     // center.floors.push(floor._id);
//     await center.save();
//     // // set floor Id to the new values of wings
//     // if (wings && wings.length > 0) {
//     //   await Wing.updateMany(
//     //     { _id: { $in: wings } },
//     //     {
//     //       $set: {
//     //         floor: floor._id,
//     //       },
//     //     }
//     //   );
//     // }
//     res.status(201).json({
//       status: "success",
//       message: "Floor created successfully",
//       data: floor,
//     });
//   }
// );
// export const updateFloor = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const floor = await Floor.findById(id);
//     if (!floor) {
//       return next(new AppError("Floor not found", 404));
//     }

//     // ===handle center operations

//     const { center: centerId }: { center: string } = req.body;
//     if (!centerId) {
//       return next(new AppError("Center is required", 404));
//     }
//     // then delete the floor from prev center and add it to new one
//     const prevCenterId = floor.center.toString();
//     const prevCenter = await Center.findById(prevCenterId);

//     if (!prevCenter) {
//       return next(new AppError("Previous center not found", 404));
//     }

//     // if updated center not equale to saved center ==>

//     // if (centerId !== prevCenterId) {
//     //   // remove floor from prev center
//     //   prevCenter.floors = prevCenter.floors.filter(
//     //     (id) => !id.equals(floor._id)
//     //   );

//     //   await prevCenter.save();
//     //   // Push the current floor to the new center floors
//     //   const newCenter = await Center.findById(centerId);
//     //   if (!newCenter) {
//     //     return next(
//     //       new AppError(`No center found with this is ${centerId}`, 404)
//     //     );
//     //   }

//     //   newCenter.floors.push(floor._id);
//     //   await newCenter.save();
//     // }

//     //===handle wings operations
//     // const prevWings = floor.wings;
//     // const newWings = req.body.wings;

//     // const removedValues = prevWings.filter(
//     //   (item) => !newWings.includes(item.toString())
//     // );
//     // const addedValues = newWings.filter(
//     //   (item: string) => !prevWings.includes(new Types.ObjectId(item))
//     // );

//     // remove floor Id from the old wings

//     // if (removedValues && removedValues.length > 0) {
//     //   Wing.updateMany(
//     //     { _id: { $in: removedValues } },
//     //     {
//     //       $set: {
//     //         floor: undefined,
//     //       },
//     //     }
//     //   );
//     // }

//     // // set floor Id to the new values of wings
//     // if (addedValues && addedValues.length > 0) {
//     //   await Wing.updateMany(
//     //     { _id: { $in: addedValues } },
//     //     {
//     //       $set: {
//     //         floor: id,
//     //       },
//     //     }
//     //   );
//     // }
//     // ==========================================================================
//     // floor.center = new Types.ObjectId(centerId);
//     // if (req.body.name) {
//     //   floor.name = req.body.name;
//     // }
//     // if (req.body.floorNumber) {
//     //   floor.floorNumber = req.body.floorNumber;
//     // }
//     // if (req.body.floorNumber) {
//     //   floor.code = req.body.code;
//     // }
//     // if (req.body.floorNumber) {
//     //   floor.wings = req.body.wings;
//     // }
//     // await floor.save();
//     // ==========================

//     const updatedFloor = await Floor.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     res.status(201).json({
//       status: "success",
//       message: "Floor created successfully",
//       data: updatedFloor,
//     });
//   }
// );
export const updateFloor = updateOne(Floor);
export const createFloor = createOne(Floor);
export const deleteFloor = deleteOne(Floor);
export const getFloors = getAll(Floor, ["name"], [], "wings wingCount");
export const getFloor = getOne(Floor, "", "wings wingCount");
