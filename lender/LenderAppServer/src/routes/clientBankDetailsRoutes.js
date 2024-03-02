import express from "express";
const router = express.Router();

import * as clientBankDetailsController from "../controllers/clientBankDetailsController.js";

//define routes

router.post(
  "/createClientBankDetails",
  clientBankDetailsController.createClientBankDetails
);
router.get(
  "/getAllClientBankDetails",
  clientBankDetailsController.getAllClientBankDetails
);
router.get(
  "/getClientBankDetailsById/:id",
  clientBankDetailsController.getClientBankDetailsById
);
router.patch(
  "/updateClientBankDetailsById/:id",
  clientBankDetailsController.updateClientBankDetailsById
);
router.patch(
  "/updateClientBankDetailsByClientId/:id",
  clientBankDetailsController.updateClientBankDetailsByClientId
);
router.delete(
  "/deleteClientBankDetailsById/:id",
  clientBankDetailsController.deleteClientBankDetailsById
);

export default router;
