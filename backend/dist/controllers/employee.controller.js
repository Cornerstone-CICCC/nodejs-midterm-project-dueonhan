"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_model_1 = __importDefault(require("../models/employee.model"));
const uuid_1 = require("uuid");
const employee_model_2 = __importDefault(require("../models/employee.model"));
const addEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName, dateOfbirth, email, phoneNumber, startDate, department, status, } = req.body;
    console.log("req.body;", req.body);
    const employeeNumber = (0, uuid_1.v4)();
    if (!(firstName === null || firstName === void 0 ? void 0 : firstName.trim()) ||
        !(lastName === null || lastName === void 0 ? void 0 : lastName.trim()) ||
        !(dateOfbirth === null || dateOfbirth === void 0 ? void 0 : dateOfbirth.trim()) ||
        !(email === null || email === void 0 ? void 0 : email.trim()) ||
        !(phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.trim()) ||
        !(startDate === null || startDate === void 0 ? void 0 : startDate.trim())) {
        res.status(400).json({ message: "Please check your input." });
        return;
    }
    const isSuccess = yield employee_model_1.default.create({
        employeeNumber,
        firstName,
        middleName,
        lastName,
        dateOfbirth,
        email,
        phoneNumber,
        startDate,
        department,
        status,
    });
    if (!isSuccess) {
        res.status(409).json({ message: "Employee already exists!" });
        return;
    }
    res.status(201).json({
        message: "Employee successfully added!",
        redirectTo: "/dashboard",
    });
});
const getallEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield employee_model_1.default.getAll();
    res.status(200).json({
        message: "Employee list fetched successfully.",
        data: list,
    });
});
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeNumber } = req.params;
    const employee = yield employee_model_1.default.getEmployee(employeeNumber);
    console.log("employee", employee);
    if (!employee) {
        return res.status(400).json({
            message: "Employee not found.",
        });
    }
    return res.status(200).json({
        message: "Employee list fetched successfully.",
        data: employee,
    });
});
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeNumber = req.params.employeeNumber;
    const isDeleted = yield employee_model_2.default.deleteEmployee(employeeNumber);
    if (!isDeleted) {
        res.status(404).json({ message: "Employee not found." });
        return;
    }
    res.status(200).json({ message: "Employee deleted." });
});
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeNumber = req.params.employeeNumber;
    const data = req.body;
    const updated = yield employee_model_2.default.updateEmployee(employeeNumber, data);
    if (!updated) {
        return res.status(404).json({ message: "Employee not founded" });
    }
    return res.status(200).json(updated);
});
const searchEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = String(req.query.keyword || "");
    const searched = yield employee_model_2.default.searchEmployee(keyword);
    if (!searched || searched.length === 0) {
        return res.status(404).json({ message: "Employee not found", data: [] });
    }
    return res.status(200).json({ message: "Employees found", data: searched });
});
exports.default = {
    addEmployee,
    getallEmployee,
    getEmployee,
    deleteEmployee,
    updateEmployee,
    searchEmployee,
};
