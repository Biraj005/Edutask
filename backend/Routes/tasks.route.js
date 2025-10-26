import { Router } from "express";
import { addTask, getAllTasksForTeacher, getSingleTask, submitTask } from "../Controller/task.controller.js";
import authenticateJWT from "../midllware/auth.js";

const taskRouter = Router();

taskRouter.post("/api/teacher/tasks",authenticateJWT,getAllTasksForTeacher)
taskRouter.get('/api/task/:userId/:taskId',authenticateJWT,getSingleTask);
taskRouter.put("/api/task/",authenticateJWT,addTask);
taskRouter.post("/api/submit/:Id",authenticateJWT,submitTask);


export default taskRouter;