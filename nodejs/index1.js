import  express  from "express";
import path from "path"

const app = express();

app.use(express.static(path.join(path.resolve(), "public")))

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

app.listen(5000, () => {
  console.log("server is working")
})