var mongoose = require('mongoose')

var Schema = mongoose.Schema; //define Schema variable

var AuthorSchema = new mongoose.Schema({  //defining author schema
    name: { type: String, minlength:3, required: [true, "A name is required!"], trim:true },
    quotes: [{type:Schema.Types.ObjectId, ref: 'Quote'}],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default:Date.now}})

mongoose.model("Author", AuthorSchema) //create blank author table in authorschema
