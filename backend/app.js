import express from "express";
import "dotenv/config";
import userRouter from "./Routes/user.route.js";
import taskRouter from "./Routes/tasks.route.js";
import subjectRouter from "./Routes/subject.route.js";
import { connectDb } from "./util/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();

const __dirname = path.resolve();

if(process.env.NODE_ENV!=="production"){
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );
}


app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(subjectRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;
connectDb();
app.listen(PORT, () => {
  console.log(`the app is running at ${process.env.PORT}`);
});
