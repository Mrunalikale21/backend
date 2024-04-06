import express from "express"
import userRouter from "./routes/user.route.js"
import taskRouter from "./routes/task.route.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";




export const app = express();

config({
  path: "./data/.env"
})

//using middleware to use json data
app.use(express.json())
app.use(cookieParser())

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);


// app.get("/", (req,res) => {
//   res.send("Nice working")
// });




// /userid/asdasa
// /userid/abhishek

//this is dynamic rout that id given is dyanamic we sholud always out dyanamic route at last
// app.get("/userid/:id", async(req,res) => {
//   const {id} = req.params;
//   const user = await User.findById(id);
// console.log(req.params)
//   res.status(200)
//   .json({
//     success: true,
//     user,
//   })
// })

