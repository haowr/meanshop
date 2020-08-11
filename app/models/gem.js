// app/models/app.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

//Define Gems model w mongoose schema.
/*module.exports = mongoose.model('Gem', {
    name : String,
    price: Number,
    description: String,
    canPurchase: Boolean,
    images: Array,
    reviews: Array,
    done : Boolean
});
*/
module.exports = mongoose.model('Product',{

    name : String,
    price: Number,
    description: String,
    statistics: String,
    canPurchase:Boolean,
    images:Array,
    reviews: Array,
    done: Boolean


});

