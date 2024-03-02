import express from "express";
const router = express.Router();

import * as clientVerificationIdController from "../controllers/clientVerificationIdController.js";

//define routes

router.post(
  "/createVerification",
  clientVerificationIdController.createClientVerification
);
router.get(
  "/getAllVerification",
  clientVerificationIdController.getAllClientVerifications
);
router.get(
  "/getVerificationById/:id",
  clientVerificationIdController.getClientVerificationById
);
router.patch(
  "/updateVerification/:id",
  clientVerificationIdController.updateClientVerificationById
);
router.delete(
  "/deleteVerification/:id",
  clientVerificationIdController.deleteClientVerificationById
);

export default router;
