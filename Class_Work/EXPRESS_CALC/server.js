const express = require("express");
const fs = require("fs");
const app = express();

app.use(req,res, next) => {
    const timestamp = new Date().toISOStrings();
    const log =
    "request received at " +
     req.url +
}

app.use(express.json());


FileSystem.appendFile("./logs.txt",log, (err) =>)

app.get("/sum", (req, res)=>{
    const sum = parseInt(req.query.a) + parseInt(req.query.b);
    res.send(sum.toLocaleString())
})

app.get("/sub", (req,res)=>{
    const sub = parseInt(req.query.a) - parseInt(req.query.b);
    res.send(sub.tolocalString())
})

app.get("/mult", (req,res)=>{
    const mult = parseInt(req.query.a) - parseInt(req.query.b);
    res.send(mult.tolocalString())
})

app.listen(3000, ()=> {
    console.log("server running at port 3000");
})