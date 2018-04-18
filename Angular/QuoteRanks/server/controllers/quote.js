var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');
var Author = mongoose.model('Author');

module.exports = {

    getQuotes: function(req, res){
        Author.findOne({_id:req.params.id}).populate('quotes').exec(function(err,author){ //populate/exec to bring in quotes field
            if (err){
                res.json({status:"error"})
            }
            else{
                res.json({status:'success', author:author})
            }
        })
    },
    addQuote: function(req,res){
        var quote = new Quote()
        quote.text=req.body.quote;
        quote._author=req.body.id; //grabbing author id from body
        quote.save(function(err){
            if(err){
                res.json({status:"error"})
            }
            else{
                Author.findOne({_id : req.body.id}, function(err, author){
                    if(err){
                        res.json({status : 'error'})
                    }
                    else
                    {

                        author.quotes.push(quote);
                        author.save(function(err){
                            if(err){
                                res.json({status:"error"})
                            }
                            else{
                                res.json({status:"success"})
                            }
                        })
                    }
                })
            }
        })
    },

    deleteQuote: function(req,res){
        Quote.deleteOne({_id: req.params.id}, function(err){
            if(err){
                res.json({status:"error"})
            }
            else{
                Author.findOne({_id:req.params.authorId}).populate("quotes").exec(function(err,author){
                    if(err){
                        res.json({status:"error"})
                    }
                    else{
                        res.json({status: 'success', author:author})
                    }
                })
            }
        })
    },

    downVote: function(req,res){
        Quote.findOne({_id:req.params.id}, function (err,quote){
            if(err){
                res.json({status: "error"})
            }
            else
            {
                quote.votes-=1;
                quote.save(function(err,quote){
                    if(err){
                        res.json({status: "error"})
                    }
                    else{
                        Author.findOne({_id:quote._author}).populate('quotes').exec(function(err,author){
                            if(err){
                                res.json({status:"error"})
                            }
                            else{
                                res.json({status:"success", author: author})
                            }
                        })

                    }
                })
            }

        })
    },

    upVote: function(req,res){
        Quote.findOne({_id:req.params.id}, function(err,quote){
            if(err){
                res.json({status:"error"})
            }
            else
            {
                quote.votes+=1;
                quote.save(function(err,quote){
                    if(err){
                        res.json({status:"error"})
                    }
                    else{
                        Author.findOne({_id:quote._author}).populate("quotes").exec(function(err,author){
                            if(err){
                                res.json({status:"error"})
                            }
                            else{
                                res.json({status:"success", author:author})
                            }
                        })
                    }
                })
            }
        })
    }
}