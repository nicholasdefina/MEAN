//Requirements
var express = require("express");
var session = require("express-session");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

//App configuration

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/static")));
app.use(session({
    secret: "meowmeowmeow",
    resave: true,
    saveUninitialized: true
}));
app.set("views", path.join(__dirname,"/views"));

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');


//root route, using session to hold counter, hopefully...

app.get("/", function(req,res){
    var counter = 0;
    if(req.session.counter){
        req.session.counter+=1;
        counter = req.session.counter;
    }
    else
    {
        req.session.counter = 0;
        counter = req.session.counter;
    }

    console.log(req.session.counter)
    res.render("index", {counter:counter});
})



app.post("/add2", function (req, res){
    req.session.counter +=1;
    res.redirect("/");
    
})

app.post("/reset", function(req,res){
    req.session.counter = 0;
    res.redirect("/");
})

// Tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
  })
  // this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)
  

