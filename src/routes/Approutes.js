import express from "express"
import CandidateModel from "../model/Candidate.model.js";
import RegisterUserModel from "../model/login/Login.model.js";
import bcrypt from "bcrypt";
import upload from "../config/multer.config.js";
import LeaveModel from "../model/login/Document.model.js";
import AttendanceModel from "../model/Attendence.model.js";
const router = express.Router();
router.get("/", function (req,res) {
  res.send("Hello from backend")
  })

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

router.get("/getAttendance", async (req, res) => {
  try {
    const candidate = await CandidateModel.find()
      const dummyAttendance = candidate.map(candidate => ({
        fullName: candidate.fullName,
        position: candidate.position,
        task: "Dashboard feature functionality",
        status: "present",
      }));
      return res.status(200).json({
        success: true,
        data:dummyAttendance,
      });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/addAttendance", async (req, res) => {
  const { candidateId, status } = req.body; 

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


router.post('/addLeave', upload.single('file'), async (req, res) => {
  try {
    const { fullName, designation, reason, leaveDate } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File is required and must be a .docx file' });
    }

    if (!fullName || !designation || !reason || !leaveDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newLeaveRequest = new LeaveModel({
      fullName,
      designation,
      reason,
      file: req.file.path,
      date:leaveDate,
    });

    await newLeaveRequest.save();

    res.status(200).json({
      success: true,
      message: 'Leave request added successfully',
      data: newLeaveRequest,
    });
  } catch (error) {
    console.error('Error in /addLeave:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get("/getLeaves", async (req, res) => {
  try {
    const leaves = await LeaveModel.find();
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
router.get('/downloadResume/:filename', async (req, res) => {
  const { filename } = req.params;

  try {
    const filePath = `./uploads/resumes/${filename}`;
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading resume:', err);
        return res.status(500).json({ success: false, message: 'Error downloading resume' });
      }
    });
  } catch (error) {
    console.error('Error in /downloadResume:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
router.get('/downloadLeaveDocument/:filename', async (req, res) => {
  const { filename } = req.params;

  try {
    const filePath = `./uploads/leaveDocuments/${filename}`;
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading leave document:', err);
        return res.status(500).json({ success: false, message: 'Error downloading leave document' });
      }
    });
  } catch (error) {
    console.error('Error in /downloadLeaveDocument:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;