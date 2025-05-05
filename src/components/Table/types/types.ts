
export interface Candidate {
  SrNo: number;
  fullName: string;
  email: string; 
  phoneNumber: string; 
  position: string; 
  experience: number; 
}
export interface AttendanceRecord {
  fullName: string;
  position: string;
  task: string;
  status: "present" | "absent";
}

