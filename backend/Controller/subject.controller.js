import SubjectModel from "../Model/Subject.model.js";
import userModel from "../Model/user.mode.js";

export const getAllsubjects = async (req, res) => {
  //console.log(req.user);

  const user = req.user;
  try {
    let userDoc = await userModel.findById(user._id);

    const all_subjects = await SubjectModel.find({
      _id: { $in: userDoc.subjects },
    });
    res.json({ success: true, subjects: all_subjects });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in server" });
  }
};

export const getSingleSubject = (req, res) => {
  res.send("single subject");
};

export const addSubject = async (req, res) => {
  const { name, code, description, semester } = req.body;
  console.log(name, code, description);
  console.log(req.user);

  try {
    const find_teacher = await userModel.findById(req.user._id);

    if (!find_teacher || find_teacher.userType !== "teacher") {
      return res.json({ success: false, message: "User must be a teacher" });
    }
    if (!name || !code || !description || !semester) {
      return res.json({ success: false, message: "All fields required" });
    }
    const find_subject = await SubjectModel.findOne({
      $or: [{ name: name }, { code: code }],
    });

    if (find_subject) {
      return res.json({ success: false, message: "Subject already exists" });
    }
    const newSubject = await SubjectModel.create({
      name,
      code,
      description,
      semester,
      creator: req.user._id,
    });
    const updatedTeacher = await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { subjects: newSubject._id } },
      { new: true }
    );
    console.log("new Subject", newSubject);
    res.json({ success: true, message: "Subject added", newSubject });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error in server" });
  }
};

export const addUser = async (req, res) => {
  try {
    const user = req.user;
    const { email, code } = req.body;
    console.log(code);

    if (!email || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Email and code are required" });
    }

    const teacher = await userModel.findById(user._id);
    if (!teacher || teacher.userType !== "teacher") {
      return res
        .status(403)
        .json({ success: false, message: "User must be a teacher" });
    }

    const student = await userModel.findOne({ email });
    if (!student || student.userType !== "student") {
      return res
        .status(404)
        .json({ success: false, message: "No student found with this email" });
    }

    const subject = await SubjectModel.findOne({ code });
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid subject code" });
    }
    console.log(student);

    if (student.subjects.includes(subject._id)) {
      return res.json({
        success: false,
        message: "Student already enrolled in this subject",
      });
    }
    await userModel.findByIdAndUpdate(student._id, {
      $push: { subjects: subject._id },
    });

    return res.json({
      success: true,
      message: "User successfully added to subject",
    });
  } catch (error) {
    console.error("Error in addUser:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeStudent = async (req, res) => {
  const user = req.user;
  const { studentId, subjectId } = req.body;

  console.log("studentId",studentId);
  console.log("SubjectId",subjectId);

  try {
    if (!user || !user._id) {
      return res.json({ success: false, message: "User must be a teacher" });
    }
    if (!studentId) {
      return res.json({
        success: false,
        message: "Student id is not available",
      });
    }
    if (!subjectId) {
      return res.json({
        success: false,
        message: "Subject id is not available",
      });
    }
    const get_teacher = await userModel.findById(user._id);

    if (!get_teacher) {
      return res.json({ success: false, message: "User must be a teacher" });
    }

    await userModel.findByIdAndUpdate(studentId, {
      $pull: {
        subjects: subjectId,
      },
    });

    return res.json({success:true,message:"Student is removed"});
  } catch (error) {
    return res.json({success:false,message:"Error while removing student"});
  }
};





export const test = async (req, res) => {
  try {
    const subject = await SubjectModel.find();
    res.send(subject);
  } catch (error) {}
};
