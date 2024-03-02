import express from "express";
const router = express.Router();

import * as centerDetailsController from "../controllers/centerDetailsController.js";

//define routes

router.get("/getAllCenterDetails", centerDetailsController.getAllCenterEntries);
router.get(
  "/getCenterDetailsById/:id",
  centerDetailsController.getCenterEntryById
);

router.post("/createCenterDetails", centerDetailsController.createCenterEntry);

router.patch(
  "/updateCenterDetailsById/:id",
  centerDetailsController.updateCenterEntryById
);
router.delete(
  "/deleteCenterDetailsById/:id",
  centerDetailsController.deleteCenterEntryById
);

export default router;
