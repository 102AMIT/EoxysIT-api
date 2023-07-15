import { Schema, model, Types } from 'mongoose';
import { AuditLogType } from '../types/auditLog';


const auditLogSchema = new Schema<AuditLogType>({
  action: {
    type: String,
    required: true
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const AuditLog = model<AuditLogType>('AuditLog', auditLogSchema);

export default AuditLog;
