console.log( "server.js running!" );

let express = require( "express" );
let app = express();

let bodyParser = require( "body-parser" );
let path = require( "path" );
// let mongoose = require( "mongoose" );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.use( express.static( __dirname + "/client/dist" ) );

// mongoose.connect( "mongodb://localhost/weatherapi" );


app.all( "*", ( req, res, next ) => {
    res.sendFile( path.resolve( "./client/dist/index.html" ) );
});

app.listen( 8000, function(){
    console.log( "listening on port 8000" );
});

console.log("******end server.js***********")
