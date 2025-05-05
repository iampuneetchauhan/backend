import { Schema, model } from "mongoose";

const CandidateSchema = new Schema({
  id:{
    type:String
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  declarationAccepted: {
    type: Boolean,
    default: false,
  },
  attendence:{
    type:String,
  }
}, {
  timestamps: true,
});

const CandidateModel = model("Candidate", CandidateSchema);

export default CandidateModel;
