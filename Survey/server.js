//----------begin generic copy/paste----------
//Requirements
var express = require("express");
var session = require("express-session");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

//App configuration

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/static"))); // Setup ejs templating and define the views folder.
app.use(session({
    secret: "meowmeowmeow",
    resave: true,
    saveUninitialized: true
}));
app.set("views", path.join(__dirname,"/views"));

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); // Root route to render the index.ejs view.

//----------end generic copy/paste----------


var user = {};


//root route, using session to hold counter, hopefully...

app.get("/", function(req,res){
    res.render("index");
})

app.post("/submission", function(req,res){
    user["name"] = req.body["name"];
    user["location"] = req.body["location"];
    user["language"] = req.body["language"];
    user["comments"] = req.body["comments"];
    res.redirect("/result")

})

app.get("/result", function(req,res){
    res.render("result", {user:user})
})

app.get("/return", function(req,res){
    res.redirect("/");
})



// Tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
  })
  // this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)
  
 
 
  //for sockets

//   var server = app.listen(8000, function() {
//     console.log("listening on port 8000");
//    });
//    var io = require('socket.io').listen(server);