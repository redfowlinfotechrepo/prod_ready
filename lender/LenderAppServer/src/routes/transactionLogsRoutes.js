import express from "express";
const router = express.Router();

import * as transactionLogsController from "../controllers/transactionLogsController.js";

//define routes

router.post(
  "/createTransactionLog",
  transactionLogsController.createTransactionLog
);
router.get(
  "/getAllTransactionLogs",
  transactionLogsController.getAllTransactionLogs
);
router.get(
  "/getTransactionLogById/:transId",
  transactionLogsController.getTransactionLogById
);
router.patch(
  "/updateTransactionLogById/:transId",
  transactionLogsController.updateTransactionLogById
);
router.delete(
  "/deleteTransactionLogById/:transId",
  transactionLogsController.deleteTransactionLogById
);

export default router;
