import { Router } from "express";
import employeeController from "../controllers/employee.controller";
import { checkLogin, checkLogout } from "../middleware/auth.middleware";

const employeeRouter = Router();

employeeRouter.get("/search", employeeController.searchEmployee);

employeeRouter.post("/add", employeeController.addEmployee);
employeeRouter.get("/list", employeeController.getallEmployee);

employeeRouter.get("/:employeeNumber", employeeController.getEmployee);
employeeRouter.delete("/:employeeNumber", employeeController.deleteEmployee);
employeeRouter.put("/:employeeNumber", employeeController.updateEmployee);

export default employeeRouter;
