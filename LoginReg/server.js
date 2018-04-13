//----------begin generic copy/paste----------
//Requirements as constants
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

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
mongoose.connect('mongodb://localhost/LoginReg'); //after localhost, type name of db you wish to use/create
mongoose.Promise = global.Promise; // Use native promises

//Mongoose Schemas and collections

var Schema = mongoose.Schema; //define Schema variable

var UserSchema = new mongoose.Schema({  //defining user schema
    first:{ type: String, required: true, minlength: 2, 
        validate: {
            validator: function(first){
                return /^[a-z ,.'-]+$/i.test(first);
            },
            message: "First Name cannot contain any special characters!"
        }},
    last: { type: String, required: true, minlength: 2,
        validate: {
            validator: function(last){
                return /^[a-z ,.'-]+$/i.test(last);
            },
            message: "Last Name cannot contain any special characters!"
        } },
    email: { type: String, required: true, unique: [true, "Email address already in database!"],
    validate: {
        validator: function(email){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        },
        message: "Invalid Email Address!"
    }
     },

    password: {
        type: String, required: true, minlength: 8,
        validate:
            {
                validator: function (value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
                },
                message: "Password failed validation, you must have at least 1 number, uppercase and special character"
            }
    },

    birthday: {
        type: Date, required: true,
        validate: {
            validator: function (value) {
                return value.getTime() < new Date().getTime();
            },
            message: "Date must be in the past"
        }
    }
}, { timestamps: true })


mongoose.model("User", UserSchema) //set User model by passing through UserSchema
var User = mongoose.model("User") //store model in User variable


//Routes

app.get("/", function (req, res) {
    if(req.session.userid)
    {
        res.redirect("/success");
    }
    else
    {
        res.render("index");
    }
})


app.post("/register", function (req, res) 
{
    console.log(req.body, "this is req.body!!!!!!");
    User.find({email: req.body.email}, function(error,user){
        if(user.length>=1){
            res.json({"emailError": "That email already exists in the database. Choose a different one."})
        }
        else
        {

            if (req.body.password == req.body.confirm) {
                var hash = bcrypt.hashSync(req.body.password,8)
                var user = new User({
                    first: req.body.first,
                    last: req.body.last,
                    email: req.body.email,
                    password: hash,
                    birthday: req.body.birthday
                });
                console.log(user)
                user.save(function (err) {
                    if (err) {
                        res.render("index", { errors: user.errors })
                    }
                    else {
                        
                        console.log("data received");
                        req.session.userid = user._id;
                        var thisUser = req.session.userid;
                        res.redirect("/success");
                    }
                })
            }
            else
            {
                res.json({"Password Error": "Passwords do not match."})
            }
        }
    })
})
    
app.post("/login", function(req,res)
{
    User.find({email: req.body.email}, function (err, user) //this is grabbing an array of users, which is an array of 1 in this case
    {
        if(err)
        {
            res.render("index", {errors:user.errors})
        }
        else
        {
            if(user.length>0) //check if there is a list of user objects greater than 0, if yes user exists
            {
                    console.log(user[0].password, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                if(bcrypt.compareSync(req.body.password, user[0].password))
                {
                    console.log(user.password);
                    req.session.userid=user[0]._id;
                    var thisUser = req.session.userid;
                    res.redirect("/success");
                }
                else
                {
                    res.json({"error": "Password is incorrect."})
                }
            }
        
        }
    })
})


app.get("/success", function (req, res) {
    res.render("success")
})

app.get("/logout", function (req,res)
{
    req.session.destroy();
    res.redirect("/")
})


// Tell the express app to listen on port 8000
var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
