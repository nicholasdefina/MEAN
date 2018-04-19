var path = require('path');
var products = require('../controllers/product.js')

module.exports = function(app){  //exporting routes

    app.post('/api/products', function(req, res){  //create product route
        products.create(req, res)
    })  
    app.get('/api/products', function(req, res){  //get all products route
        products.getAll(res, res)
    })
    app.delete('/api/products/:id', function(req, res){  //delete product
        products.deleteProduct(req, res)
    })
    app.get('/api/products/:id', function(req, res){  //find specific product by id
        products.getProductById(req, res)
    })
    app.put('/api/products/:id', function(req, res){  //update product by id
        // console.log("at the routes for update")
        products.updateProduct(req, res)
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))  //route for exceptions
      });
}