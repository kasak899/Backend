const express = require("express");
console.log(express);

const app = express();

app.get("/", (req, res)=>{
    res.send("hi");x
})


app.listen(3000, () => {
    console.log("server running");
})

console.log(app);