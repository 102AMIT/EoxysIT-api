import mongoose from "mongoose";

export interface LogEntryType {
    action: string;
    employee: mongoose.Types.ObjectId;
    createdAt: Date;
  }