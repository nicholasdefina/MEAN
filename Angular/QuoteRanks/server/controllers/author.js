var mongoose = require('mongoose');
var Author = mongoose.model('Author');


module.exports = {
    create: function(req,res){
        var author = new Author({name: req.body.name})
        author.save(function(err){
            if (err){
                res.json({message: author.errors})
            }
            else{
                res.json({message: "success"})
            }
        })
    },

    getAll : function(req,res){
        Author.find({}, function(err,authors){
            if(err){
                res.json({error:err})
            }
            else{
                res.json({authors:authors})
            }
        })
    },

    deleteAuthor : function(req,res){
        Author.remove({_id:req.params.id}, function(err,authors){
            if(err){
                res.json({status:'error'})
            }
            else{
                Author.find({}, function(err, authors){
                    if(err){
                        res.json({status:'error'})
                    }
                    else{
                        res.json({status:'success', authors:authors})
                    }
                })
            }
        })
    },


    getAuthorById : function(req,res){
        Author.findOne({_id:req.params.id}, function(err,author){
            if(err){
                res.json({status: 'error'})
            }
            else{
                res.json({status: 'success', author:author})
            }
        })
    },

    updateAuthor : function(req,res){
        Author.findOne({_id:req.params.id}, function(err,author){
            if(err){
                res.json({status : 'error'})
            }
            else{
                author.name=req.body.name; //updating author name to whats in input form
                author.save(function(err){
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