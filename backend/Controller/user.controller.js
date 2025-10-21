import userModel from "../Model/user.mode.js";
import { signToken } from "../util/jwtuti.js";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, department, type, passingyear } = req.body;
    console.log(name, email, password, department, type, passingyear);

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
      type,
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
        department: newUser.department,
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
  console.log(user);
  if (!user) {
    res.json({ success: false, message: "No user found" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.json({ success: false, message: "Invalid crediantials" });
    return;
  }
  const token = signToken({ _id: user._id });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.send({ success: true, message: "User logged in" });
};
