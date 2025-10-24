import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjects",
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    deadline: {
      type: Date
    },
    attachments:{
        type: String 
    }
  },
  { timestamps: true }
);

const assigntmentmodel = mongoose.model('assignment',assignmentSchema);

export default assigntmentmodel;

