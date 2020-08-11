var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShoeSchema = new Schema({
  
        name: String,
        price: Number,
        shoecolor: Array,
        pages: Array,
        colors:Array,
        hearts: Number
       // done: Boolean
});

module.exports = mongoose.model('Shoe',ShoeSchema );
