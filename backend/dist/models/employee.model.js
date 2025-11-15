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
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeModel {
    constructor() {
        this.employees = [];
        this.nextId = 1;
    }
    create(newEmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employeeNumber, firstName, middleName, lastName, dateOfbirth, email, phoneNumber, startDate, department, status, } = newEmployee;
            const foundIndex = this.employees.findIndex((u) => u.employeeNumber &&
                u.employeeNumber.toLowerCase() === employeeNumber.toLowerCase());
            if (foundIndex !== -1)
                return false;
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
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employees;
        });
    }
    getEmployee(employeeNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = this.employees.find((u) => u.employeeNumber === employeeNumber);
            if (!found) {
                return "Employee not found.";
            }
            return found;
        });
    }
    deleteEmployee(employeeNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.employees.findIndex((u) => u.employeeNumber === employeeNumber);
            if (index === -1)
                return "Employee not found";
            this.employees.splice(index, 1);
            return "Employee deleted";
        });
    }
    updateEmployee(employeeNumber, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundIndex = this.employees.findIndex((u) => u.employeeNumber === employeeNumber);
            if (foundIndex === -1)
                return "Employee not found";
            const updatedEmployee = Object.assign(Object.assign({}, this.employees[foundIndex]), data);
            this.employees[foundIndex] = updatedEmployee;
            return updatedEmployee;
        });
    }
    searchEmployee(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const lower = keyword.toLowerCase();
            this.employees.map((e) => ({
                firstName: e.firstName,
                lastName: e.lastName,
            }));
            const results = this.employees.filter((t) => {
                const match = (t.firstName && t.firstName.toLowerCase().includes(lower)) ||
                    (t.lastName && t.lastName.toLowerCase().includes(lower));
                return match;
            });
            return results;
        });
    }
}
exports.default = new EmployeeModel();
