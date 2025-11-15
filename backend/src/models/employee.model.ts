import { Employee } from "../types/employee";
import { v4 as uuidv4 } from "uuid";
import { Router, Request, Response } from "express";

class EmployeeModel {
  private employees: Employee[] = [];
  private nextId = 1;

  async create(newEmployee: Omit<Employee, "id">) {
    const {
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
    } = newEmployee;

    const foundIndex = this.employees.findIndex(
      (u) =>
        u.employeeNumber &&
        u.employeeNumber.toLowerCase() === employeeNumber.toLowerCase()
    );

    if (foundIndex !== -1) return false;

    this.employees.push({
      id: this.nextId++,
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

    return true;
  }

  async getAll(): Promise<Employee[]> {
    return this.employees;
  }

  async getEmployee(employeeNumber: String) {
    const found = this.employees.find(
      (u) => u.employeeNumber === employeeNumber
    );

    if (!found) {
      return "Employee not found.";
    }
    return found;
  }

  async deleteEmployee(employeeNumber: String) {
    const index = this.employees.findIndex(
      (u) => u.employeeNumber === employeeNumber
    );

    if (index === -1) return "Employee not found";
    this.employees.splice(index, 1);

    return "Employee deleted";
  }

  async updateEmployee(employeeNumber: String, data: Partial<Employee>) {
    const foundIndex = this.employees.findIndex(
      (u) => u.employeeNumber === employeeNumber
    );

    if (foundIndex === -1) return "Employee not found";

    const updatedEmployee: Employee = {
      ...this.employees[foundIndex],
      ...data,
    };

    this.employees[foundIndex] = updatedEmployee;
    return updatedEmployee;
  }

  async searchEmployee(keyword: string) {
    const lower = keyword.toLowerCase();

    this.employees.map((e) => ({
      firstName: e.firstName,
      lastName: e.lastName,
    }));

    const results = this.employees.filter((t) => {
      const match =
        (t.firstName && t.firstName.toLowerCase().includes(lower)) ||
        (t.lastName && t.lastName.toLowerCase().includes(lower));

      return match;
    });

    return results;
  }
}

export default new EmployeeModel();
