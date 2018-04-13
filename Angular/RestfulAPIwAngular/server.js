//----------begin generic copy/paste----------



//Requirements as constants
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');



app.use(bodyParser.json());

// app.set("views", path.join(__dirname, "/views")); THESE ARE NO LONGER NEEDED BECAUSE THEY LIVE IN ANGULAR


app.use(express.static( __dirname + '/AngularApp/dist' ));




// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));



//----------end generic config---------------------------------------------------------------------------------


//Mongoose Configuration
mongoose.connect('mongodb://localhost/RestfulAPI'); //after localhost, type name of db you wish to use/create
mongoose.Promise = global.Promise; // Use native promises

//Mongoose Schemas and collections

var Schema = mongoose.Schema; //define Schema variable

var TaskSchema = new mongoose.Schema({  //defining task schema
    title: { type: String, required: true, minlength: 2 },
    description: { type: String, required: true, minlength: 5 },
    completed: { type: Boolean, default: false },
}, { timestamps: true })

mongoose.model("Task", TaskSchema) //set Task model by passing through TaskSchema
var Task = mongoose.model("Task") //store model in Task variable


//Routes

app.get("/", function (req, res) 
{
    console.log("root works")
    Task.find({}, function (err, tasks) 
    {
        if(err)
        {
            res.json({message: "Error", error:err})
        }
        else
        {
            res.json({tasks:tasks})
        }
    })

})

app.get("/tasks", function (req, res) 
{
    console.log("root works")
    Task.find({}, function (err, tasks) 
    {
        if(err)
        {
            res.json({message: "Error", error:err})
        }
        else
        {
            res.json({tasks:tasks})
        }
    })

})



app.get("/viewtask/:id", function(req,res){
    Task.findOne({_id: req.params.id}, function(err,task){
        if(err)
        {
            res.json({error:err})
        }
        else
        {
            res.json({task:task})
        }
    })
})

app.post("/addTask", function(req,res){
    var task = new Task({title:req.body.title, description:req.body.description})
    task.save(function(err){
        if(err)
        {
            res.json({error:err})
        }
        else
        {
            res.json({task:task})
        }
    })
})


app.delete("/viewtask/:id/", function(req,res){
    Task.remove({_id: req.params.id}, function(err){
        if(err)
        {
            res.json({error:err})
        }
        else
        {
            res.json('success')
        }
    })
})


app.put("/viewtask/:id/", function(req,res){
    Task.update({_id:req.params.id},{title:req.body.title, description:req.body.description}, function(err,task){
        if(err)
        {
            res.json({error:err})
        }
        else
        {
            res.json('successful update')
        }
    })
})






// Tell the express app to listen on port 8000
var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});