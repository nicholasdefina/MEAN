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
mongoose.connect('mongodb://localhost/messageBoard'); //after localhost, type name of db you wish to use/create
mongoose.Promise = global.Promise; // Use native promises

//Mongoose Schemas and collections

var Schema = mongoose.Schema; //define Schema variable

var PostSchema = new mongoose.Schema({  //defining post schema
    name: { type: String, required: true, minlength: 2 },
    message: { type: String, required: true, minlength: 4 },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]  //this is the many field holding many objects, comments in this case
}, { timestamps: true })


mongoose.model("Post", PostSchema) //set Post model by passing through PostSchema
var Post = mongoose.model("Post") //store model in Post variable

var CommentSchema = new mongoose.Schema({ //defining comment schema
    _post: { type: Schema.Types.ObjectId, ref: "Post" }, //this is the foreign key to link to posts, hence the underscore
    name: { type: String, required: true, minlength: 2 },
    message: { type: String, required: true, minlength: 2 }
}, { timestamps: true })

mongoose.model("Comment", CommentSchema); //set Comment Model by passing through CommentSchema
var Comment = mongoose.model("Comment"); //store comment in comment variable




//Routes

app.get("/", function (req, res) {
    var allposts = Post.find({}).populate("comments").exec(function (err, posts) {
        res.render("index", { allposts: posts })
    })
})

app.post("/addpost", function (req, res) {
    var post = new Post({ name: req.body.name, message: req.body.message });

    post.save(function (err) {
        if (err) {
            res.render("index", { errors: post.errors })
        }

        else {
            res.redirect("/");
        }
    })
})




// route for getting a particular post and comments
// app.get('/posts/:id', function (req, res){
//     Post.findOne({_id: req.params.id})
//     .populate('comments')
//     .exec(function(err, post) {
//          res.render('post', {post: post});
//            });
//    });


// route for creating one comment with the parent post id
app.post('/comment/:id', function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, post) {
        // data from form on the front end
        var comment = new Comment( //setting comment and tying to post
            {
                name: req.body.comment_name,
                message: req.body.comment_message,
                _post: post._id
            });
        // now save both to the DB
        comment.save(function (err) {
            post.comments.push(comment);
            post.save(function (err) {
                if (err) {
                    console.log('Error');
                } else {
                    res.redirect('/');
                }
            });
        });
    });

});


// Tell the express app to listen on port 8000
var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
