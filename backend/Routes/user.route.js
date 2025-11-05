import { Router } from "express";
import { forgotPassword, getUser, loginUser, logout, resetPassword, signupUser } from "../Controller/user.controller.js";
import authenticateJWT from "../midllware/auth.js";

const userRouter = Router();

userRouter.post("/api/signup",signupUser);
userRouter.post("/api/login",loginUser);
userRouter.get('/api/logout',logout);
userRouter.post('/api/user/getotp',forgotPassword);
userRouter.post("/api/user/resetpassword",resetPassword)
userRouter.get('/api/user/:code',authenticateJWT,getUser);


export default userRouter;

