import { Request, Response } from 'express';
import Employee from '../models/Employee';
import AuditLog from '../models/auditLog';
import { EmployeeType } from '../types/employeeType';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';


export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, title, department, annualSalary, password }: EmployeeType = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingEmployee = await Employee.findOne({ name });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with the same name already exists' });
    }

    const newEmployee = new Employee({
      name,
      title,
      department,
      annualSalary,
      password: hashedPassword,
    });

    const savedEmployee = await newEmployee.save();

    await createAuditLog('Employee created', savedEmployee._id);

    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create employee' });
  }
};



export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { department, title, annualSalary }: Partial<EmployeeType> = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { department, title, annualSalary },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await createAuditLog('Employee updated', updatedEmployee._id);

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await createAuditLog('Employee deleted', deletedEmployee._id);

    res.json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};


// Function to create an audit log
const createAuditLog = async (action: string, employeeId: Types.ObjectId) => {
  try {
    const newAuditLog = new AuditLog({
      action,
      employeeId,
      timestamp: new Date(),
    });

    await newAuditLog.save();
  } catch (error) {
    console.error('Failed to create audit log', error);
  }
};