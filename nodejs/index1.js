import  express  from "express";
import path from path

const app = express();

app.get("/" , (req,res) => {
  // res.json({
  //   success : true,
  //   product : []
  // })
  const pathLocation = path.resolve();
  res.sendFile(path.join(pathLocation, "./index.html"))
})

app.listen(5000, () => {
  console.log("server is working")
})