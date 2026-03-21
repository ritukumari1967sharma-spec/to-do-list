const express = require("express");
const app = express();
const path = require("path");

const filepath = path.join(__dirname, "index.html");
const savepath = path.join(__dirname, "contact.html");

app.get('/' , (req,res) =>{
    res.sendFile(filepath);
})

app.post('/add' , (req,res) =>{
    res.send("add");
})
app.get('/c' , (req,res) =>{
    res.sendFile(savepath);
})


app.listen(8000,() => {
    console.log(`listen at http://localhost:${8000}`);
})