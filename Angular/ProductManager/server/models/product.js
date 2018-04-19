var mongoose = require('mongoose')

var Schema = mongoose.Schema; //define Schema variable

var ProductSchema = new mongoose.Schema({  //defining product schema
    name: {
        type: String, minlength: 3, required: [true, "A name is required!"], trim: true, validate: {
            validator: function (name) {
                return /^[a-z ,.'-]+$/i.test(name);
            },
            message: "Name cannot contain any special characters!"
        }
    },
    price: { type: Number, required: [true, "A price is required!"], min:[0, "Price must be at least 0.01"] ,
    validate: {
        validator: function (price) {
            return /^\d+(?:\.\d{1,2})?$/i.test(price);
        },
        message: "Price can only contain two decimals!",
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}})

mongoose.model("Product", ProductSchema) //create blank product table in productschema
