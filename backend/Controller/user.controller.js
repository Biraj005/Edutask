import userModel from "../Model/user.mode.js";
import SubjectModel from "../Model/Subject.model.js";
import { signToken } from "../util/jwtuti.js";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "../util/OtpSender.js";

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
      userType: type,
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
        role: newUser.userType,
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
    role: user.userType,
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

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ success: false, message: "Error logging out" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    const { code } = req.params;
    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "Need paper code" });
    }

    const teacher = await userModel.findById(user._id);
    if (!teacher || teacher.userType !== "teacher") {
      return res
        .status(403)
        .json({ success: false, message: "User must be a teacher" });
    }

    const subjectDoc = await SubjectModel.findOne({ code });
    if (!subjectDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }
    const users = await userModel
      .find({
        subjects: { $in: [subjectDoc._id] },
        userType: { $ne: "teacher" },
      })
      .select("-password");

    return res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

export const forgotPassword = async (req, res) => {
  console.log(req.user);
  try {
    const { email } = req.body;
    console.log(email);

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid user" });
    }

    const otp = generateOtp();

    await userModel.findByIdAndUpdate(user._id, {
      Otp: otp,
      OtpExpireDate: Date.now() + 3 * 60 * 1000,
    });

    await sendOtpEmail(user.email, otp);

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;
  console.log(email,otp,password)
  if (!email || !otp) {
    return res.json({ success: false, message: "required field is missing" });
  }
  try {
    const get_user = await userModel.findOne({ email });

    if (!get_user) {
      return res.json({ success: false, message: "Invalid user" });
    }

    console.log(otp,get_user)

    if (String(get_user.Otp) !== String(otp)) {
      return res.json({ success: false, message: "Invalid otp" });
    }

    if (getUser.OtpExpireDate < Date.now()) {
      return res.json({ success: true, message: "Otp expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};
