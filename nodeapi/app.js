import express from "express"

const app = express();

app.get("/", (req,res) => {
  res.send("Nice working")
});

app.get("/users/all", (req,res) => {
  res.json({
    success: true,
    users: [],
  })
})

app.listen(4000,() => {
  console.log("server is working")
})