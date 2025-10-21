import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
    default: "student",
  },
  passingyear: {
    type: Number,
    default: null,
  },
});

const userModel =   mongoose.model("/user", userSchema);
export default userModel;
