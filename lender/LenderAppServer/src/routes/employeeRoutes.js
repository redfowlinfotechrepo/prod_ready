import express from "express";
import * as employeeController from "../controllers/employeeController.js";
const router = express.Router();

//define routes

router.get("/getAllEmployees", employeeController.getAllEmployees);
router.get("/getEmployeeById/:id", employeeController.getEmployeeById);

router.post("/register", employeeController.registerEmployee);
router.post("/login", employeeController.loginEmployee);

router.patch("/updateEmployeeById/:id", employeeController.updateEmployeeById);

router.delete("/deleteEmployeeById/:id", employeeController.deleteEmployeeById);

export default router;
