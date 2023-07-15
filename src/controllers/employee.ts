import { Request, Response } from 'express';
import Employee from '../models/Employee';
import LogEntry from '../models/LogEntry';
import { EmployeeType } from '../types/employeeType';

const employeeController = {
  createEmployee: async (req: Request, res: Response) => {
    try {
      const { name, title, department, annualSalary } = req.body;

      const employee: EmployeeType = new Employee({
        name,
        title,
        department,
        annualSalary,
      });

      // await employee.save();

      // await createLogEntry('Employee Created', employee._id);

      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateEmployee: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { department, title, annualSalary } = req.body;

      const employee: EmployeeType | null = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      // await createLogEntry('Employee Updated', employee._id);

      employee.department = department;
      employee.title = title;
      employee.annualSalary = annualSalary;

      // await employee.save();

      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteEmployee: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const employee: EmployeeType | null = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      // await createLogEntry('Employee Deleted', employee._id);

      employee.isDeleted = true;

      // await employee.save();

      res.json({ message: 'Employee deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

const createLogEntry = async (action: string, employeeId: string) => {
  try {
    // Create a new log entry
    const logEntry = new LogEntry({
      action,
      employee: employeeId,
    });

    // Save the log entry to the database
    await logEntry.save();
  } catch (error) {
    console.error('Error creating log entry:', error);
  }
};

export default employeeController;
