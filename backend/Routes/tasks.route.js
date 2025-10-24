import { Router } from "express";
import { addTask, getAllTasks, getSingleTask, submitTask } from "../Controller/task.controller.js";
import authenticateJWT from "../midllware/auth.js";

const taskRouter = Router();

taskRouter.get("/api/tasks",authenticateJWT,getAllTasks)
taskRouter.get('/api/task/:userId/:taskId',authenticateJWT,getSingleTask);
taskRouter.put("/api/task/:userId",authenticateJWT,addTask);
taskRouter.post("/api/submit/:Id",authenticateJWT,submitTask);


export default taskRouter;