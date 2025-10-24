import { Router } from "express";
import { getUser, loginUser, logout, signupUser } from "../Controller/user.controller.js";
import authenticateJWT from "../midllware/auth.js";

const userRouter = Router();

userRouter.post("/api/signup",signupUser);
userRouter.post("/api/login",loginUser);
userRouter.get('/api/logout',logout);
userRouter.get('/api/user/:code',authenticateJWT,getUser);

export default userRouter;

