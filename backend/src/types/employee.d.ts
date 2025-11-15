export interface Employee {
  id: number;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfbirth: string;
  email: string;
  phoneNumber: string;
  startDate: string;
  department?: string;
  position?: string;
  status?: "Employed" | "On Leave";
}
