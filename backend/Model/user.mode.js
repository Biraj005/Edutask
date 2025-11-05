import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default: "student",
  },
  passingyear: {
    type: Number,
    default: null,
  },
  Otp: {
    type: Number,
    default: null,
  },
  OtpExpireDate: {
    type: Date,
    default: null,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjects",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
