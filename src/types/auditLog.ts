import mongoose, { Types } from "mongoose";

export interface AuditLogType {
  action: string;
  employeeId: Types.ObjectId;
  timestamp: Date;
}