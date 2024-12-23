import { v4 as uuidv4 } from "uuid";
import multer, { MulterError } from "multer";
import AppError from "../utils/AppError";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/helpers";
import sharp from "sharp";
interface CustomRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}
const multerOptions = () => {
  // using Mimorphy Storage
  const multerStorage = multer.memoryStorage();
  const multerFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) => {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      return callback(
        new AppError("Only images are allowed", 400) as unknown as null,
        false
      );
    }
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  return upload;
};
// 1- save files using Mimorphy Storage
export const uploadSingleImage = (fieldName: string) =>
  multerOptions().single(fieldName);

// 2- resize image
export const resizeImage = (
  folderNmae: string,
  fieldName: string,
  width: number = 600,
  height: number = 600,
  quality: number = 95
) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next();
    }
    const fileName = `${fieldName}-${uuidv4()}-${Date.now()}.jpeg`;
    const imageBuffer = req.file.buffer;
    await sharp(imageBuffer)
      .resize(width, height)
      .toFormat("jpeg")
      .jpeg({ quality })
      .toFile(`./src/uploads/${folderNmae}/${fileName}`);
    req.body[fieldName] = fileName;
    next();
  });

export const uploadMultipleImages = (
  arrayOfFields: { name: string; maxCount?: number }[]
) => {
  return multerOptions().fields(arrayOfFields);
};

export const resizeImages = (
  folderName: string,
  fieldName: string,
  isMultiple: boolean = false,
  dimensions?: {
    width: number;
    height: number;
  },

  quality: number = 100
) =>
  asyncHandler(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const files = req.files;

      // If the field does not exist in req.files, move to the next middleware
      if (!files || !files[fieldName]) {
        return next();
      }

      // If it's a single image field
      if (!isMultiple) {
        const fileName = `${fieldName}-${uuidv4()}-${Date.now()}.jpeg`;
        const imageBuffer = files[fieldName][0].buffer;
        await sharp(imageBuffer)
          .resize(dimensions?.width, dimensions?.height)
          .toFormat("jpeg")
          .jpeg({ quality })
          .toFile(`./src/uploads/${folderName}/${fileName}`);
        req.body[fieldName] = fileName;
      }

      // If it's a multiple images field
      if (isMultiple) {
        req.body[fieldName] = [];
        await Promise.all(
          files[fieldName].map(async (img, index) => {
            const imageName = `${fieldName}-${uuidv4()}-${Date.now()}-${index}.jpeg`;
            await sharp(img.buffer)
              .resize(dimensions?.width, dimensions?.height)
              .toFormat("jpeg")
              .jpeg({ quality })
              .toFile(`./src/uploads/${folderName}/${imageName}`);
            req.body[fieldName].push(imageName);
          })
        );
      }

      next();
    }
  );

export const multerErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof MulterError) {
    // Handle specific multer errors
    if (error.code === "LIMIT_FILE_SIZE") {
      throw new AppError(
        `File size exceeds the limit for field: ${error.field}`,
        400
      );
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      throw new AppError(
        `Too many files uploaded for field: ${error.field}`,
        400
      );
    }
    throw new AppError(`Uploade error: ${error.message}`, 400);
  } else if (error) {
    // Handle general errors (e.g., unsupported file type)
    throw new AppError(`Uploade error: ${error.message}`, 400);
  }

  next();
};
