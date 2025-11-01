import assigntmentmodel from "../Model/assignment.model.js";
import submissionmodel from "../Model/submisson.model.js";
import userModel from "../Model/user.mode.js";
import { uploadToCloudinary } from "../util/cloudnary.js";
export const getAllTasksForTeacher = async (req, res) => {
  const user = req.user;
  const { subject } = req.body;
  try {
    if (!user || !user._id) {
      return res.json({ success: false, message: "No valid credintails" });
    }

    if (!subject) {
      return res.json({
        scucess: false,
        message: "Subject code must be provided",
      });
    }

    const tasks = await assigntmentmodel.find({ subject });
    return res.json({ success: true, tasks });
  } catch (error) {
    res.json({ success: false, message: "Error in server" });
  }
};
export const getAllTasksForStudent = async (req, res) => {
  const user = req.user;
  const { subject } = req.body;

  try {
    if (!user || !user._id) {
      return res.json({ success: false, message: "No valid credentials" });
    }

    if (!subject) {
      return res.json({
        success: false,
        message: "Subject code must be provided",
      });
    }

    const now = new Date();
    const tasks = await assigntmentmodel
      .find({ subject })
      .lean()
      .select("-createdBy");

    const submissions = await submissionmodel
      .find({ student: user._id })
      .lean();
    const submissionMap = new Map();
    for (const sub of submissions) {
      submissionMap.set(sub.assignment.toString(), sub);
    }
    const taskList = tasks.map((task) => {
      const deadlinePassed = task.deadline && new Date(task.deadline) < now;

      let status = "pending";
      let fileUrl = null;

      const submission = submissionMap.get(task._id.toString());
      if (submission) {
        status = "complete";
        fileUrl = submission.fileUrl || null;
      } else if (deadlinePassed) {
        status = "expired";
      }

      return {
        _id: task._id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        attachments: task.attachments,
        status,
        fileUrl,
      };
    });

    return res.json({ success: true, tasks: taskList });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error in server" });
  }
};

export const addTask = async (req, res) => {
  const user = req.user;
  const { title, description, subject, deadline } = req.body;
  if (req.fileValidationError) {
    return res.json({ success: false, message: req.fileValidationError });
  }
  const file = req.file;
  try {
    if (!user || !user._id) {
      return res.json({ success: false, message: "User must be a teacher" });
    }

    const get_teacher = await userModel.findById(user._id);

    if (!get_teacher || get_teacher.userType !== "teacher") {
      return res.json({ success: false, message: "User must be a teacher" });
    }

    let attachmentUrl = null;

    if (file) {
      const fileBuffer = file.buffer;
      const mimetype = file.mimetype;
      const uploadResult = await uploadToCloudinary(
        fileBuffer,
        "task_attachments",
        mimetype
      );
      attachmentUrl = uploadResult.secure_url;
    }

    const newTask = await assigntmentmodel.create({
      createdBy: user._id,
      title,
      description,
      subject,
      deadline,
      attachments: attachmentUrl,
    });

    res.json({ success: true, message: "Task added", newTask });
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const submitTask = async (req, res) => {
  const user = req.user;
  const { taskId, text } = req.body;
  const file = req.file;

  try {
    let file_link = null;
    if (!taskId) {
      return res.json({
        success: true,
        message: "Assigment id should be given",
      });
    }

    if (!user || !user._id) {
      return res.json({ success: false, message: "Invalid credintals" });
    }
    if (!file) {
      return res.json({ success: false, message: "No Assignment is provived" });
    }
    const get_student = await userModel.findById(user._id);
    if (!get_student || get_student.userType === "teacher") {
      return res.json({ success: false, message: "User must be a student" });
    }
    const get_assignment = await assigntmentmodel.findById(taskId);

    if (!get_assignment) {
      return res.json({ success: false, message: "No valid assignment " });
    }
    if (get_assignment.deadline < Date.now()) {
      return res.json({
        success: false,
        message: "Already late for submission",
      });
    }
    if (file) {
      const fileBuffer = file.buffer;
      const mimetype = file.mimetype;

      const uploadResult = await uploadToCloudinary(
        fileBuffer,
        "task_attachments",
        mimetype
      );
      file_link = uploadResult.secure_url;
    }
    const check_prev = await submissionmodel.findOne({
      assignment: taskId,
      student: user._id,
    });

    if (check_prev) {
      const newDetails = {};

      if (file_link) {
        newDetails.finUrl = file_link;
      }
      if (text) {
        newDetails.text = text;
      }
      await submissionmodel.findByIdAndUpdate(check_prev._id, newDetails);
      return res.json({ success: true, message: "Assignment Resubmitted" });
    }

    const new_submission = await submissionmodel.create({
      name:get_student.name,
      assignment: taskId,
      student: user._id,
      fileUrl: file_link,
      text: text ? text : "",
      submittedAt: Date.now(),
      status: "submitted",
    });

    return res.json({ success: true, message: "Assignment submitted" });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error in server" });
  }
};

export const removeTask = async (req, res) => {
  const user = req.user;
  const { taskId } = req.body;
  if (!user || !user._id) {
    return res.json({ success: false, message: "No user details provide" });
  }
  if (!taskId) {
    return res.json({ success: false, message: "No task provided" });
  }
  try {
    const get_teacher = await userModel.findById(user._id);
    if (!get_teacher) {
      return res.json({ success: false, message: "Invalid credintials" });
    }

    const get_task = await assigntmentmodel.findById(taskId);

    if (!get_task) {
      return res.json({ success: false, message: "Task not found." });
    }
    if (get_task.createdBy.toString() !== get_teacher._id.toString()) {
      return res.json({ success: false, message: "Invalid credintials" });
    }
    await assigntmentmodel.findByIdAndDelete(taskId);
    res.json({ success: true, message: "Task removed" });
  } catch (error) {
    res.json({ success: false, message: "Error in server" });
    console.error(error.message);
  }
};

export const getSubmissions = async (req, res) => {
  const user = req.user;
  const {taskId} = req.body;

  if (!user || !user._id) {
    return res.json({ success: false, message: "No user details provide" });
  }
  if (!taskId) {
    return res.json({ success: false, message: "No task provided" });
  }
  try {
    const get_teacher = await userModel.findById(user._id);


    if (!get_teacher) {
      return res.json({ success: false, message: "Invalid credintials" });
    }
    const get_assignment = await assigntmentmodel.findById(taskId);

    if (!get_assignment) {
      return res.json({ success: false, message: "No valid task" });
    }
    const submissions = await submissionmodel.find({
      assignment: taskId,
    });

    res.json({
      success: true,
      message: "Task removed",
      submmisons: submissions,
    });
  } catch (error) {
    res.json({ success: false, message: "Error in server" });
    console.error(error.message);
  }
};
