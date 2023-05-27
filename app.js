const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const port = 80;
const app = express();


mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const itemSchema = new mongoose.Schema({
    name:String
});

const item = mongoose.model("Items",itemSchema);
 

app.get('/',(req,res)=>{
    
    item.find({}).then((result)=>{
       
        res.render("list",{newListItem:result});
        
    }).catch((err)=>{
        console.log(err)
    })
    
    
})

app.post('/',(req,res)=>{
    
    newItem = new item({
        name:req.body.newInput,
    });
   newItem.save()
    res.redirect("/");
})

app.post('/delete',(req,res)=>{
    const check = req.body.checkbox;
    
    item.findByIdAndRemove(check).then(()=>{
        console.log("item deleted");
        res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(port,()=>{
    console.log("server listning on port 80.")
})