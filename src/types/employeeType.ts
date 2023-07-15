 export interface EmployeeType  {
  name: string;
  password: string;
  title: string;
  department: 'HR' | 'Tech' | 'Product' | 'Leadership';
  annualSalary: number;
}