import { Router } from "express";
import { addTask, getAllTasksForTeacher, getSingleTask, getUser, removeTask, submitTask } from "../Controller/task.controller.js";
import authenticateJWT from "../midllware/auth.js";
import { upload } from "../util/multer.js";

const taskRouter = Router();

taskRouter.post("/api/teacher/tasks",authenticateJWT,getAllTasksForTeacher)
taskRouter.delete("/api/teacher/task",authenticateJWT,removeTask);
taskRouter.get('/api/task/:userId/:taskId',authenticateJWT,getSingleTask);
taskRouter.put("/api/teacher/task",authenticateJWT,upload.single('attachment'),addTask);
taskRouter.post("/api/submit/:Id",authenticateJWT,submitTask);

taskRouter.post("/api/task/test",getUser);


export default taskRouter;