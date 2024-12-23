import Center from "../models/center.model";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlersFactory";

// export const createCenter = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const center = await Center.create(req.body);
//     if (!center) {
//       return next(new AppError("Center not found", 404));
//     }
//     await center.save();
//     // set the new Center Id to the new values of floors
//     // if (floors && floors.length > 0) {
//     //   await Floor.updateMany(
//     //     { _id: { $in: floors } },
//     //     {
//     //       $set: {
//     //         center: center._id,
//     //       },
//     //     }
//     //   );
//     // }
//     res.status(201).json({
//       status: "success",
//       message: "Floor created successfully",
//       data: center,
//     });
//   }
// );
export const createCenter = createOne(Center);
export const updateCenter = updateOne(Center);
export const deleteCenter = deleteOne(Center);
export const getCenters = getAll(Center, ["name"], [], "floors floorCount");
export const getCenter = getOne(Center, "", "floors floorCount");
