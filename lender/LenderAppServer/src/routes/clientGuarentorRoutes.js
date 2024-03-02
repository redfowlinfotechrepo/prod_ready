import express from "express";
const router = express.Router();

import * as clientGuarentorController from "../controllers/clientGuarentorController.js";

//define routes

router.get(
  "/getAllClientGuarantorDetails",
  clientGuarentorController.getAllClientGuarantorDetails
);
router.get(
  "/getClientGuarantorById/:guarantorId",
  clientGuarentorController.getClientGuarantorById
);
router.post(
  "/createClientGuarantorDetails",
  clientGuarentorController.createClientGuarantorDetails
);
router.patch(
  "/updateClientGuarantorById/:guarantorId",
  clientGuarentorController.updateClientGuarantorById
);
router.delete(
  "/deleteClientGuarantorById/:guarantorId",
  clientGuarentorController.deleteClientGuarantorById
);

export default router;
