import express from "express"
import CandidateModel from "../model/Candidate.model.js";
import RegisterUserModel from "../model/login/Login.model.js";
import bcrypt from "bcrypt";
import upload from "../config/multer.config.js";
import LeaveModel from "../model/login/Document.model.js";
import AttendanceModel from "../model/Attendence.model.js";
const router = express.Router();


router.post("/addCandidate", upload.single("resume"), async (req, res) => {
  console.log("File:", req.file);
  console.log("Body:", req.body); 

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const { fullName, email, phoneNumber, position, experience, declarationAccepted } = req.body;

    const existingCandidate = await CandidateModel.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({
        message: "Candidate already exists with this email.",
      });
    }

    const candidate = new CandidateModel({
      fullName,
      email,
      phoneNumber,
      position,
      experience,
      resumeUrl: req.file.filename,
      declarationAccepted: declarationAccepted === "true",
    });

    await candidate.save();

    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      resumeDownloadUrl: `/uploads/resumes/${req.file.filename}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/getcandidates",async(req,res)=>{
  try{
  const candidates = await CandidateModel.find();
  const formattedCandidates = candidates.map((item,i)=>({
    index: i+1,
    id: item._id,
    fullName: item.fullName,
    email: item.email,
    phoneNumber: item.phoneNumber,
    position: item.position,
    experience: item.experience,
}))
  return res.status(200).json(formattedCandidates)}
  catch(e){
    console.log(e)
    return res.status(500).json("unable to send candidates")
  }
})




// Register user
router.post("/register", async(req,res)=>{
  const {name,email,password} = req.body
  try{
    const hashedPassword =await bcrypt.hash(password,10)
  const newUser = new RegisterUserModel({name,email,password:hashedPassword});
  await newUser.save().then(()=>console.log("user registered succesfully"))
  return res.status(200).json({message:"user registered successfully", newUser})
}
catch(E){
  console.log("there is some error while registering user:", E);
}
})
// Login user
router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await RegisterUserModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    console.log("login password", password, "existing user password", existingUser.password)
    const isPasswordSame = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordSame) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    const token = existingUser.generateToken();

    return res.status(200).json({
      message: `Welcome ${existingUser.name}`,
      token: token
    });

  } catch (err) {
    console.log("Error during login:", err);
    return res.status(500).json({ message: "Server error" });
  }
});
// getting all posts
router.get("/getusers", async(req, res) => {
  try{
  const posts = await CandidateModel.find()
  return res.status(200).json(posts);
  }
  catch(E){
    console.log("error while getting all the posts");
  }
});

router.get("/getAttendance", async (req, res) => {
  try {
    const attendanceRecords = await AttendanceModel.find().populate("candidateId", "fullName");

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json({
      success: true,
      data: attendanceRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/addAttendance", async (req, res) => {
  const { candidateId, status } = req.body; // Status is either 'present' or 'absent'

  try {
    if (!candidateId || !status) {
      return res.status(400).json({ message: "Candidate ID and Status are required" });
    }

    const newAttendance = new AttendanceModel({
      candidateId,
      status,
    });

    await newAttendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: newAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/addLeave", async (req, res) => {
  const { fullName, status, reason, file, date } = req.body; // All fields from Leave schema

  try {
    // Validate that all required fields are provided
    if (!fullName || !status || !reason || !file || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new leave request record
    const newLeaveRequest = new LeaveModel({
      fullName,
      status,
      reason,
      file,
      date,
    });

    // Save the leave request to the database
    await newLeaveRequest.save();

    res.status(201).json({
      success: true,
      message: "Leave request added successfully",
      data: newLeaveRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/getLeaves", async (req, res) => {
  try {
    // Retrieve all leave requests from the database
    const leaves = await LeaveModel.find();

    // Return the leave data as a response
    res.status(200).json({
      success: true,
      message: "Leave requests retrieved successfully",
      data: leaves,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
export default router;