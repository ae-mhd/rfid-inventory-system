import express from "express";

import {
  createOffice,
  deleteOffice,
  getOffices,
  getOffice,
  updateOffice,
} from "../controllers/office.controller";

const router = express.Router();

router.get("/", getOffices).post("/", createOffice);

router
  .get("/:id", getOffice)
  .put("/:id", updateOffice)
  .delete("/:id", deleteOffice);

export default router;
