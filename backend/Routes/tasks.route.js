import { Router } from "express";

import {
    addTask, getAllTasksForStudent,
    getAllTasksForTeacher, 
   getSubmissions, removeTask, submitTask 

} from "../Controller/task.controller.js";

import authenticateJWT from "../midllware/auth.js";
import { upload } from "../util/multer.js";

const taskRouter = Router();

taskRouter.post("/api/teacher/tasks",authenticateJWT,getAllTasksForTeacher);
taskRouter.post("/api/student/tasks",authenticateJWT,getAllTasksForStudent);
taskRouter.delete("/api/teacher/task",authenticateJWT,removeTask);
taskRouter.put("/api/teacher/task",authenticateJWT,upload.single('attachment'),addTask);
taskRouter.put("/api/submit/",authenticateJWT,upload.single("file"),submitTask);
taskRouter.post("/api/teacher/getsubmissions",authenticateJWT,getSubmissions)



export default taskRouter;