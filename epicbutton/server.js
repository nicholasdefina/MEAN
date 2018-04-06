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

//setup ejs templating, define views folder
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); // Root route to render the index.ejs view.

//----------end generic copy/paste----------



//root route, using session to hold counter, hopefully...

app.get("/", function(req,res){
    console.log("root works")
    res.render("index");
})


// Tell the express app to listen on port 8000
  var server = app.listen(8000, function() 
  {
    console.log("listening on port 8000");
   });
   var io = require('socket.io').listen(server); //retrieves object from server (line 48) and passes into socket

    var counter = 0;

   io.sockets.on('connection', function (socket) { ;
    console.log("Client/socket id is: ", socket.id);
    socket.on('disconnect', function(){
        console.log("Client/socket disconnected", socket.id)
    });
    
    socket.on('push', function (data)
    {
        console.log("push button working")
        counter+=1;
        io.emit("counter_update", {
            response: "Updated Counter",
            counter: counter
        });
    });

    socket.on('reset', function()
    {
        console.log('reset works');
        counter = 0;
        io.emit('counter_update',
        {
            response:"Updated Counter",
            counter: counter,
        });
    });
});

//tried multiple methods of getting this work, no luck. will come back at some point

  // this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)
  
 