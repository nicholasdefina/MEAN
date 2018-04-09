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



//----------end generic config---------------------------------------------------------------------------------




//Mongoose Configuration
mongoose.connect('mongodb://localhost/dashboard'); //after localhost, type name of db you wish to use/create
mongoose.Promise = global.Promise; // Use native promises

//Mongoose Schemas and collections
var AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    species: { type: String, required: true, minlength: 2 },
    interests: { type: String, required: true, minlength: 2 }
}, { timsetamps: true })
mongoose.model("Animal", AnimalSchema)

var Animal = mongoose.model("Animal");


//Routes

app.get("/", function (req, res) {

    var search = Animal.find({}, function (err, animals) {
        res.render("index", { search: animals });
    })
})


app.get("/new", function (req, res) {
    res.render("new");
})

app.get("/show/:id", function (req, res) {
    animal = Animal.findOne({ _id: req.params.id }, function (err, animal) {
        res.render("show", { animal: animal });
    });
})

app.get("/edit/:id", function (req, res) {
    animal = Animal.findOne({ _id: req.params.id }, function (err, animal) {
        res.render("edit", { animal: animal });
    });
})


// When the user presses the submit button on index.ejs it should send a post request to '/users'.  In
//  this route we should add the user to the database and then redirect to the root route (index view).
app.post("/add", function (req, res) {
    console.log("POST DATA", req.body); // This is where we would add the user from req.body to the database.

    var animal = new Animal({ name: req.body.name, species: req.body.species, interests: req.body.interests });  // create a new quote model with the name and quote corresponding to those from req.body

    animal.save(function (err)  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    {
        if (err) {
            res.render("new", { errors: animal.errors })
        }
        else {
            res.redirect("/");
        }

    });
})

app.post("/update/:id", function (req, res) {
    Animal.update({ _id: req.params.id },
        {
            name: req.body.name,
            species: req.body.species,
            interests: req.body.interests
        },
        function (err) {
            if (err) {
                res.render(`/edit/${req.params.id}`, { errors: animal.errors })
            }
            else
            {
                res.redirect("/")
            }
        })

})

app.get("/delete/:id", function (req, res) {

    Animal.remove({_id:req.params.id}, function (err) {
       
            res.redirect("/");
    });
})


// Tell the express app to listen on port 8000
var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
