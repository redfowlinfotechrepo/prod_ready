import express from "express";
const router = express.Router();

import * as clientPersonalDtlsController from "../controllers/clientPersonalDtlsController.js";

//define routes

router.post(
  "/createClientPersonalDetails",
  clientPersonalDtlsController.createClientPersonalDetails
);

router.get(
  "/getClientPersonalDetailsById/:customerId",
  clientPersonalDtlsController.getClientPersonalDetailsById
);
router.get(
  "/getAllClientPersonalDetails",
  clientPersonalDtlsController.getAllClientPersonalDetails
);

router.patch(
  "/updateClientPersonalDetailsById/:customerId",
  clientPersonalDtlsController.updateClientPersonalDetailsById
);
router.delete(
  "/deleteClientPersonalDetailsById/:customerId",
  clientPersonalDtlsController.deleteClientPersonalDetailsById
);

export default router;
