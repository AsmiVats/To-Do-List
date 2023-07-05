const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");


const app = express();

let items =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    let day = date();
    res.render("list",{kindOfDay: day,newListitems: items});
})

app.post("/",function(req,res){
   let item = req.body.newitem;
    items.push(item);
    res.redirect("/");
    console.log(item);
})


app.listen(3000,function(){
    console.log("Server is starting at port 3000");
})