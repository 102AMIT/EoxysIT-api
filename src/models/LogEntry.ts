import mongoose, { Schema, Document } from 'mongoose';
import { LogEntryType } from '../types/logentryType'


const logEntrySchema: Schema = new Schema({
  action: { type: String, required: true },
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<LogEntryType>('LogEntry', logEntrySchema);
