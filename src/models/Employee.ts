import mongoose, { Schema ,model  } from 'mongoose';
import { EmployeeType } from '../types/employeeType';

const employeeSchema = new Schema<EmployeeType>({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ['HR', 'Tech', 'Product', 'Leadership'],
    required: true
  },
  annualSalary: {
    type: Number,
    required: true
  }
});

const Employee = model<EmployeeType>('Employee', employeeSchema);

export default Employee;
