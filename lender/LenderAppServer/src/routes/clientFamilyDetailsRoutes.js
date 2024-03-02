import express from "express";
const router = express.Router();

import * as clientFamilyDetailsController from "../controllers/clientFamilyDetailsController.js";

//define routes

router.post(
  "/createFamilyMember",
  clientFamilyDetailsController.createFamilyMember
);
router.get(
  "/getAllFamilyMembers",
  clientFamilyDetailsController.getAllFamilyMembers
);
router.get(
  "/getFamilyMemberById/:id",
  clientFamilyDetailsController.getFamilyMemberById
);
router.patch(
  "/updateFamilyMemberById/:id",
  clientFamilyDetailsController.updateFamilyMemberById
);
router.delete(
  "/deleteFamilyMemberById/:id",
  clientFamilyDetailsController.deleteFamilyMemberById
);

export default router;
