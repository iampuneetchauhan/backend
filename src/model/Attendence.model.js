import { Schema, model, Types } from "mongoose";

const AttendanceSchema = new Schema({
  candidateId: {
    type: Types.ObjectId,
    ref: "Candidate", 
    required: true
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  Task: {
    type: String,
    default: "Admin Dashboard features"
  }
});

const AttendanceModel = model("Attendance", AttendanceSchema);

export default AttendanceModel;
