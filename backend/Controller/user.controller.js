import userModel from "../Model/user.mode.js";
import SubjectModel from '../Model/Subject.model.js'
import { signToken } from "../util/jwtuti.js";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, department, type, passingyear } = req.body;
    if (!email || !name || !password || !department || !type) {
      return res.json({ success: false, message: "User details required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      department,
      userType:type,
      passingyear: passingyear || null,
    });

    const token = signToken({ _id: newUser._id });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User account is created",
      user: {
        name: newUser.name,
        email: newUser.email,
        role:  newUser.userType,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ success: false, message: "User details required" });
    return;
  }

  let user;
  try {
    user = await userModel.findOne({ email });
  } catch (error) {
    console.error("Error whing finding user");
  }
  if (!user) {
    res.json({ success: false, message: "No user found" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.json({ success: false, message: "Invalid crediantials" });
    return;
  }
  const token = signToken({ 
    _id: user._id,
    email: user.email,
    role: user.userType
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.send({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      role: user.userType,
    },
    message: "User logged in",
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: false });
  res.json({ success: true, message: "Logged out successfully" });
};

export const getUser = async (req, res) => {

  try {
    const user = req.user;                
    const { code } = req.params;         
    if (!code) {
      return res.status(400).json({ success: false, message: "Need paper code" });
    }

    const teacher = await userModel.findById(user._id);
    if (!teacher || teacher.userType !== "teacher") {
      return res.status(403).json({ success: false, message: "User must be a teacher" });
    }


    const subjectDoc = await SubjectModel.findOne({ code });
    if (!subjectDoc) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
   const users = await userModel.find({
    subjects: { $in: [subjectDoc._id] },
    userType: { $ne: "teacher" }    
  }).select("-password");


    return res.json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
