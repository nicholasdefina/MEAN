var mongoose = require('mongoose')

var Schema = mongoose.Schema; //define Schema variable

var QuoteSchema = new mongoose.Schema({  //defining quote schema
    text: { type: String, minlength:3, required: [true, "A quote is required!"], trim:true },
    _author: {type:Schema.Types.ObjectId, ref: 'Author'}, //foreign key field
    votes: {type: Number, default:0},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default:Date.now}})

mongoose.model("Quote", QuoteSchema) //create blank quote table in quoteschema
