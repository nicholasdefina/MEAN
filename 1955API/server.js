//----------begin generic copy/paste----------
//Requirements as constants
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');



app.use(bodyParser.json());

app.set("views", path.join(__dirname, "/views"));



// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));



//----------end generic config---------------------------------------------------------------------------------


//Mongoose Configuration
mongoose.connect('mongodb://localhost/1955API'); //after localhost, type name of db you wish to use/create
mongoose.Promise = global.Promise; // Use native promises

//Mongoose Schemas and collections

var Schema = mongoose.Schema; //define Schema variable

var PersonSchema = new mongoose.Schema({  //defining person schema
    name: { type: String, required: true, minlength: 2 }
}, { timestamps: true })

mongoose.model("Person", PersonSchema) //set Person model by passing through PersonSchema
var Person = mongoose.model("Person") //store model in Person variable


//Routes

app.get("/", function(req,res)
{
    console.log("Root works")
    Person.find({}, function(err, persons)
    {
        if(err)
        {
            res.json({message: "Error", error:err})
        }
        else
        {
            res.json({bdaysin1955:persons})
        }
    })
})


app.get("/new/:name/", function(req,res){
    var person = new Person({name:req.params.name})
    person.save(function(err){

        if(err)
        {
            res.json({error:err})
        }
        else
        {
            res.redirect('/')
        }
    
    })
})


app.get("/remove/:name/", function(req,res){
    Person.remove({name: req.params.name}, function(err){
        if(err)
        {
            res.json({error:err})
        }
        else
        {
            res.redirect('/')
        }
    })
})


app.get("/:name", function(req,res){
    Person.findOne({name:req.params.name}, function(err,person){
        if(err)
        {
            res.json({error:err})
        }
        else
        {
            res.json({person})
        }
    })
})



 // Tell the express app to listen on port 8000
 var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
