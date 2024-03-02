import express from "express";
const router = express.Router();

import * as clientOtherExpensesController from "../controllers/clientOtherExpensesController.js";

//define routes

router.post(
  "/createHouseHoldDtls",
  clientOtherExpensesController.createClientHouseHold
);
router.get(
  "/getAllHouseHoldDtls",
  clientOtherExpensesController.getAllClientHouseHold
);
router.get(
  "/getHouseHoldDtlsById/:id",
  clientOtherExpensesController.getClientHouseHoldById
);
router.patch(
  "/updateClientHouseHoldById/:id",
  clientOtherExpensesController.updateClientHouseHoldById
);
router.delete(
  "/deleteClientHouseHoldById/:id",
  clientOtherExpensesController.deleteClientHouseHoldById
);

export default router;
