import { Request, Response } from "express";
import EmployeeModel from "../models/employee.model";
import { Employee } from "../types/employee";
import { v4 as uuidv4 } from "uuid";
import employeeModel from "../models/employee.model";

const addEmployee = async (
  req: Request<{}, {}, Omit<Employee, "id">>,
  res: Response
) => {
  const {
    firstName,
    middleName,
    lastName,
    dateOfbirth,
    email,
    phoneNumber,
    startDate,
    department,
    status,
  } = req.body;
  console.log("req.body;", req.body);

  const employeeNumber = uuidv4();

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !dateOfbirth?.trim() ||
    !email?.trim() ||
    !phoneNumber?.trim() ||
    !startDate?.trim()
  ) {
    res.status(400).json({ message: "Please check your input." });
    return;
  }

  const isSuccess = await EmployeeModel.create({
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
};

const getallEmployee = async (req: Request, res: Response) => {
  const list = await EmployeeModel.getAll();

  res.status(200).json({
    message: "Employee list fetched successfully.",
    data: list,
  });
};

const getEmployee = async (
  req: Request<{ employeeNumber: String }>,
  res: Response
) => {
  const { employeeNumber } = req.params;
  const employee = await EmployeeModel.getEmployee(employeeNumber);
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
};

const deleteEmployee = async (
  req: Request<{ employeeNumber: String }>,
  res: Response
) => {
  const employeeNumber = req.params.employeeNumber;
  const isDeleted = await employeeModel.deleteEmployee(employeeNumber);

  if (!isDeleted) {
    res.status(404).json({ message: "Employee not found." });
    return;
  }

  res.status(200).json({ message: "Employee deleted." });
};

const updateEmployee = async (
  req: Request<{ employeeNumber: String }>,
  res: Response
) => {
  const employeeNumber = req.params.employeeNumber;
  const data = req.body;
  const updated = await employeeModel.updateEmployee(employeeNumber, data);

  if (!updated) {
    return res.status(404).json({ message: "Employee not founded" });
  }

  return res.status(200).json(updated);
};

const searchEmployee = async (req: Request, res: Response) => {
  const keyword = String(req.query.keyword || "");
  const searched = await employeeModel.searchEmployee(keyword);

  if (!searched || searched.length === 0) {
    return res.status(404).json({ message: "Employee not found", data: [] });
  }

  return res.status(200).json({ message: "Employees found", data: searched });
};

export default {
  addEmployee,
  getallEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  searchEmployee,
};
