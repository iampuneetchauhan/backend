import { Schema, model } from "mongoose";

const LeaveSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
  },
  reason: {
    type: String,
    required: true,
  },
  file: {
    type: String, 
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const LeaveModel = model("Leave", LeaveSchema);

export default LeaveModel;
