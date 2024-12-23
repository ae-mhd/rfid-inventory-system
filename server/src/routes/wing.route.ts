import express from "express";

import {
  createWing,
  deleteWing,
  getWings,
  getWing,
  updateWing,
} from "../controllers/wing.controller";

const router = express.Router();

router.get("/", getWings).post("/", createWing);

router.get("/:id", getWing).put("/:id", updateWing).delete("/:id", deleteWing);

export default router;
