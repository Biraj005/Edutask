import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assignment",
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    fileUrl: {
      type: String,
      default:null,
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["submitted", "checked", "late"],
      default: "submitted"
    },
  },
  { timestamps: true }
);

const submissionmodel = mongoose.model('submission',submissionSchema);
export default submissionmodel;
