import  express  from "express";
import path from "path"
import mongoose  from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017", 
{dbName: "backend",
}).then(() => console.log("Database connected")).catch((e) => console.log(e))



const app = express();
const users = []

//using  middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

//setting up view engine
app.set("view engine", "ejs");

app.get("/" , (req,res) => {
  // res.json({
  //   success : true,
  //   product : []
  // })
  // const pathLocation = path.resolve();
  // res.sendFile(path.join(pathLocation, "./index.html"))
   res.render("index", {name:"abhishek"})
  // res.sendFile("index")
})

app.get("/add", (req,res) => {
  res.send("nice")
})

app.get("/success", (req,res) => {
  res.render("success")
})

app.post("/contact", (req,res) => {
  users.push({username: req.body.name, email:req.body.email})
  res.redirect("/success")

}) //and we are using for rendering or doing operation of nevigating to page then we can call it as route

app.get("/users", (req,res) => {
  res.json({
    users,
  })
})  //if we are sending data then we can call it as api

app.listen(5000, () => {
  console.log("server is working")
})