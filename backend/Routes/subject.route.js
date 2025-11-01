import { Router } from "express";
import { addSubject, addUser, getAllsubjects, removeStudent, removeSubject } from "../Controller/subject.controller.js";
import authenticateJWT from "../midllware/auth.js";
const subjectRouter = Router();

subjectRouter.get("/api/subjects",authenticateJWT,getAllsubjects)
subjectRouter.post('/api/subject/',authenticateJWT,addSubject);
subjectRouter.put('/api/subject/user',authenticateJWT,addUser);
subjectRouter.delete('/api/student',authenticateJWT,removeStudent);
subjectRouter.delete("/api/subject",authenticateJWT,removeSubject);


export default subjectRouter;