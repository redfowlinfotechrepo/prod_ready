import express from "express";
const router = express.Router();

import * as cashFlowController from "../controllers/cashFlowController.js";

//define routes

router.get("/getAllEntries", cashFlowController.getAllEntries);
router.get("/getEntryById/:id", cashFlowController.getEntryById);
router.post("/createEntry", cashFlowController.createEntry);
router.patch("/updateEntryById/:id", cashFlowController.updateEntryById);
router.delete("/deleteEntryById/:id", cashFlowController.deleteEntryById);

export default router;
