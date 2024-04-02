import http from "http";
//import { gfName , gfName2, gfName3 } from "./features.js";
//import * as myObj from "./features.js"
import { generateLovePercent } from "./features.js";
import fs from "fs" 
import path from "path";

console.log(path.extname("/home/random/index.html"))

//const home = fs.readFile("./index.html", ()=> {
  //console.log("file read");
//})  //this operation takes it time thus it will run after all below things

//console.log(home);

//console.log(myObj.gfName2)
//console.log(myObj.generateLovePercent())

// console.log(gfName);
// console.log(gfName2);
// console.log(gfName3);

const server = http.createServer((req,res) => {
    console.log(req.method);

    if(req.url === "/about"){
      res.end(`<h1>love is ${generateLovePercent()}<h1>`);
    }
    else if(req.url === "/"){
      fs.readFile("./index.html", (err, home)=> {
      res.end(home);
    }) //home is data here
    }
    else if(req.url === "/contact"){
      res.end("<h1>contact Page<h1>"); //ends the reponse
    }
    else{
      res.end("<h1>Page not found<h1>");
    }
  
})

server.listen(5000, () => {
  console.log("server is working")
})