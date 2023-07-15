import mongoose, { Schema } from 'mongoose';
import { EmployeeType } from '../types/employeeType';

const employeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  annualSalary: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<EmployeeType>('Employee', employeeSchema);
