//----------begin generic copy/paste----------
//Requirements as constants
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

//General configuration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/static"))); // Setup ejs templating and define the views folder.
app.use(session({
    secret: "meowmeowmeow",
    resave: true,
    saveUninitialized: true
}));
app.set("views", path.join(__dirname, "/views"));

//setup ejs templating, define views folder
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // Root route to render the index.ejs view.

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));

//----------end generic config----------


//Mongoose Configuration
mongoose.connect('mongodb://localhost/quoting_dojo'); //after localhost, type name of db you wish to use/create
mongoose.Promise = global.Promise; // Use native promises

//Mongoose Schemas and collections
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, minlength: 10, maxlength: 200 }
}, { timsetamps: true })
mongoose.model("Quote", QuoteSchema)

var Quote = mongoose.model("Quote");


//Routes

app.get("/", function (req, res) {
    
        res.render('index');
    })


// When the user presses the submit button on index.ejs it should send a post request to '/users'.  In
//  this route we should add the user to the database and then redirect to the root route (index view).
app.post("/addquote", function (req, res) 
{
    console.log("POST DATA", req.body); // This is where we would add the user from req.body to the database.

    var quote = new Quote({ name: req.body.name, quote: req.body.quote });  // create a new quote model with the name and quote corresponding to those from req.body

    quote.save(function (err)  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    {
        if (err) 
        {
            res.render("index", {errors: quote.errors})
        }
        else 
        {
            res.redirect("/quoteboard");
        }
        
    });
})

app.get("/quoteboard", function (req, res) {

    Quote.find({}, function(err,quotes)
    {
        if(err)
        {
            res.render("index")
        }
        else
        {
            res.render("quoteboard", {quotes:quotes});
        }
    });
})


// Tell the express app to listen on port 8000
var server = app.listen(8000, function() 
{
  console.log("listening on port 8000");
 });
