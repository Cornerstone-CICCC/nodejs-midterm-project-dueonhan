"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const employeeRouter = (0, express_1.Router)();
employeeRouter.get("/search", employee_controller_1.default.searchEmployee);
employeeRouter.post("/add", employee_controller_1.default.addEmployee);
employeeRouter.get("/list", employee_controller_1.default.getallEmployee);
employeeRouter.get("/:employeeNumber", employee_controller_1.default.getEmployee);
employeeRouter.delete("/:employeeNumber", employee_controller_1.default.deleteEmployee);
employeeRouter.put("/:employeeNumber", employee_controller_1.default.updateEmployee);
exports.default = employeeRouter;
