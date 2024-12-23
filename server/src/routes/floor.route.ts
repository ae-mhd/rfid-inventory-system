import express from "express";

import {
  createFloor,
  deleteFloor,
  getFloors,
  getFloor,
  updateFloor,
} from "../controllers/floor.controller";

const router = express.Router();

router.get("/", getFloors).post("/", createFloor);

router
  .get("/:id", getFloor)
  .put("/:id", updateFloor)
  .delete("/:id", deleteFloor);

export default router;
