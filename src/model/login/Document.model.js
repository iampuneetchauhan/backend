import { Schema, model } from "mongoose";

const LeaveSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"], // Assuming status can be "approved", "pending", or "rejected"
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  file: {
    type: String, // Assuming it's a file URL or file path for the uploaded document
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const LeaveModel = model("Leave", LeaveSchema);

export default LeaveModel;
