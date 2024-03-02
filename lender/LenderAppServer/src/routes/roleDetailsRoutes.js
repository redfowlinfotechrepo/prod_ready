import express from "express";
const router = express.Router();

import * as roleDetailsController from "../controllers/roleDetailsController.js";

//define routes

router.get("/getAllRoles", roleDetailsController.getAllRoles);
router.get("/getRoleById/:id", roleDetailsController.getRoleById);

router.post("/createRole", roleDetailsController.createRole);

router.patch("/updateRoleById/:id", roleDetailsController.updateRoleById);

router.delete("/deleteRoleById/:id", roleDetailsController.deleteRoleById);

export default router;
