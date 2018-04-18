var path = require('path');
var authors = require('../controllers/author.js')
var quotes = require('../controllers/quote.js')

module.exports = function(app){  //exporting routes

    app.post('/api/authors', function(req, res){  //create author route
        authors.create(req, res)
    })  
    app.get('/api/authors', function(req, res){  //get all author route
        authors.getAll(res, res)
    })
    app.delete('/api/authors/:id', function(req, res){  //delete author
        authors.deleteAuthor(req, res)
    })
    app.get('/api/authors/:id', function(req, res){  //find specific author by id
        authors.getAuthorById(req, res)
    })
    app.put('/api/authors/:id', function(req, res){  //update uathor by id
        authors.updateAuthor(req, res)
    })
    app.get('/api/quotes/:id', function(req, res){ //get all quotes
        quotes.getQuotes(req, res)
    })
    app.post('/api/quotes', function(req, res){  //create  quote
        quotes.addQuote(req, res)
    })
    app.delete('/api/quotes/:id/:authorId', function(req, res){  //delete quote by id and author id
        quotes.deleteQuote(req, res)
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))  //route for exceptions
      });
}