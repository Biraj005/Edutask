import express from "express";
import "dotenv/config";
import userRouter from "./Routes/user.route.js";
import taskRouter from "./Routes/tasks.route.js";
import subjectRouter from "./Routes/subject.route.js";
import { connectDb } from "./util/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();



app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));
app.use(cookieParser())
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(subjectRouter);

app.get("/", (req, res) => {
  res.send("Hiii");
});

connectDb();
app.listen(process.env.PORT, () => {
  console.log(`the app is running at ${process.env.PORT}`);
});
