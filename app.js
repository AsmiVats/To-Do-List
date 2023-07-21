const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname+"/date.js");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/toDoDB');
}
const itemsSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model('Item',itemsSchema);

const item1 = new Item({
    name: "Enter your To-Do Task"
});

const defaultItems = [item1];

app.get("/", function (req, res) {
    let day = date();
  
    Item.find({})
    .then(foundItems => {

      if(foundItems.length == 0){
        Item.insertMany(defaultItems);
        res.redirect("/");
      }
      else{
        res.render("list", { kindOfDay: day, newListItems: foundItems });
      }
    })
    .catch(err => {
      console.log(err);
    });
  });

app.post("/",function(req,res){
   let itemName = req.body.newitem;
   
   const item = new Item({
    name:itemName
   })
    item.save();

    res.redirect("/");
    console.log(item);
})

app.post("/delete",function(req,res){
  const checked = req.body.checkbox;

  Item.findOneAndDelete({_id: checked})
  .then( () => {
    console.log("Item deleted Successfully.")
    res.redirect("/");
  })
  .catch(err =>{
    console.log("err");
  });

})


app.listen(3000,function(){
    console.log("Server is starting at port 3000");
})
