var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AllShoeSchema = new Schema ({

         name: String,
        price: Number,
        shoecolor: Array,
        pages: Array,
        colors:Array,
        hearts: Number,
        heartactivated:Boolean



});

module.exports = mongoose.model('AllShoe', AllShoeSchema);