import express from "express";

import {
  createCenter,
  deleteCenter,
  getCenters,
  getCenter,
  updateCenter,
} from "../controllers/center.controller";

const router = express.Router();

router.get("/", getCenters).post("/", createCenter);

router.put("/:id", updateCenter);
router
  .get("/:id", getCenter)

  .delete("/:id", deleteCenter);

export default router;
