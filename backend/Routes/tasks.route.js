import { Router } from "express";
import { addTask, getAllTasks, getSingleTask, submitTask } from "../Controller/task.controller.js";

const taskRouter = Router();

taskRouter.get("/api/tasks",getAllTasks)
taskRouter.get('/api/task/:userId/:taskId',getSingleTask);
taskRouter.put("/api/task/:userId",addTask);
taskRouter.post("/api/submit/:Id",submitTask);


export default taskRouter;