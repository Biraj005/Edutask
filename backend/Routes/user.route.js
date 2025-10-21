import { Router } from "express";
import { loginUser, signupUser } from "../Controller/user.controller.js";

const userRouter = Router();

userRouter.post("/api/signup",signupUser);
userRouter.post("/api/login",loginUser);


export default userRouter;

