var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ShoeSchema = new Schema ({

        _creator: {type: Number, ref: 'Person'},
         name: String,
        price: Number,
        shoecolor: [{type: Array, ref:'Shoe'}],
        page:Array,
        colors: [{type: Array, ref:'Shoe'}],
        hearts: Number,
        done: Boolean
        


});






//var shoePages = new Schema({


//})

module.exports = mongoose.model('Noog', ShoeSchema);