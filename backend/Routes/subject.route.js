import { Router } from "express";
import { addSubject, addUser, getAllsubjects, getSingleSubject, removeStudent, test } from "../Controller/subject.controller.js";
import authenticateJWT from "../midllware/auth.js";
const subjectRouter = Router();

subjectRouter.get("/api/subjects",authenticateJWT,getAllsubjects)
subjectRouter.get('/api/subject/:id',authenticateJWT,getSingleSubject);
subjectRouter.post('/api/subject/',authenticateJWT,addSubject);
subjectRouter.put('/api/subject/user',authenticateJWT,addUser);
subjectRouter.delete('/api/student',authenticateJWT,removeStudent);


subjectRouter.get("/test/subject/test",test);

export default subjectRouter;