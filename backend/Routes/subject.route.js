import { Router } from "express";
import { addSubject, getAllsubjects, getSingleSubject } from "../Controller/subject.controller.js";
import authenticateJWT from "../midllware/auth.js";
const subjectRouter = Router();

subjectRouter.get("/api/subjects",authenticateJWT,getAllsubjects)
subjectRouter.get('/api/subject/:id',authenticateJWT,getSingleSubject);
subjectRouter.post('/api/subject',authenticateJWT,addSubject);

export default subjectRouter;