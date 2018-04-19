var mongoose = require('mongoose');
var Product = mongoose.model('Product');


module.exports = {
    create: function(req,res){
        var product = new Product({name: req.body.name, price: req.body.price})
        console.log(product, "this is the controller")
        product.save(function(err){
            if (err){
                console.log(product.errors, "these are controller errors")
                res.json({message: product.errors})
            }
            else{
                res.json({message: "success"})
            }
        })
    },

    getAll : function(req,res){
        Product.find({}, function(err,products){
            if(err){
                res.json({error:err})
            }
            else{
                res.json({products:products})
            }
        })
    },

    deleteProduct : function(req,res){
        Product.remove({_id:req.params.id}, function(err,products){
            if(err){
                res.json({status:'error'})
            }
            else{
                Product.find({}, function(err, products){
                    if(err){
                        res.json({status:'error'})
                    }
                    else{
                        res.json({status:'success', products:products})
                    }
                })
            }
        })
    },


    getProductById : function(req,res){
        Product.findOne({_id:req.params.id}, function(err,product){
            if(err){
                res.json({status: 'error'})
            }
            else{
                res.json({status: 'success', product:product})
            }
        })
    },

    updateProduct : function(req,res){
        Product.findOne({_id:req.params.id}, function(err,product){
            if(err){
                res.json({status : 'error'})
            }
            else{
                product.name=req.body.name; //updating product name to whats in input form
                product.price=req.body.price;
                console.log(product, "in the controller now")
                product.save(function(err){
                    if(err){
                        res.json({status:"error"})
                    }
                    else{
                        res.json({status: "success"})
                    }
                })
            }
        })
    }
}