import {app} from "./app.js"
import { connetDB } from "./data/database.js"


connetDB();

app.listen(process.env.PORT ,() => {
  console.log("server is working")
})