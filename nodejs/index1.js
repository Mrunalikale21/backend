import  express  from "express";
import path from "path"
import mongoose  from "mongoose";
import { name } from "ejs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"


mongoose.connect("mongodb://127.0.0.1:27017", 
{dbName: "backend",
}).then(() => console.log("Database connected")).catch((e) => console.log(e))

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema)

const app = express();
const users = []

//using  middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//setting up view engine
app.set("view engine", "ejs");

// app.get("/" , (req,res) => {
//   // res.json({
//   //   success : true,
//   //   product : []
//   // })
//   // const pathLocation = path.resolve();
//   // res.sendFile(path.join(pathLocation, "./index.html"))
//    res.render("index", {name:"abhishek"})
//   // res.sendFile("index")
// })

//for login

const isauthenticated = async(req,res,next) => {
  const {token} = req.cookies;

  if(token){
    const decoded =  jwt.verify(token, "sdfggghkfdndnd")
    req.user = await User.findById(decoded._id)

    next();
  }else{
    res.render("login")
  }
}

app.get("/", isauthenticated , (req,res) => {
  console.log(req.user);
  res.render("logout", {name: req.user.name})
})

app.get("/register", (req,res) => {
  res.render("register")
})

app.post("/register", async(req,res) => {

  const {name, email, password} = req.body;

   let user = await User.findOne({email})
   if(user){
    return res.redirect("/login")
   }

  user = await User.create({
    name, 
    email,
    password,
  })

  
  const token = jwt.sign({_id: user._id}, "sdfggghkfdndnd");
  
  res.cookie("token",  token,{
    httpOnly:true, expires:new Date(Date.now()+60*1000)
  })
  
  res.redirect("/")
})

app.get("/logout", (req,res) => {
  res.cookie("token",  "null",{
    httpOnly:true, expires:new Date(Date.now()+60*1000)
  })
  
  res.redirect("/")
})



// app.get("/add", async (req,res) => {
//   await Messge.create({name: "Abhi2", email:"smapl4e@gmail.com"});
//     res.send("Nice")
//   })


//   app.get("/success", (req,res) => {
//   res.render("success")
// })


// app.post("/contact", async (req,res) => {

//   const {name, email} = req.body;

//   await Messge.create({name, email})
//   res.redirect("/success")

// }) //and we are using for rendering or doing operation of nevigating to page then we can call it as route

// app.get("/users", (req,res) => {
//   res.json({
//     users,
//   })
// })  //if we are sending data then we can call it as api

app.listen(5000, () => {
  console.log("server is working")
})