var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CheckoutSchema = new Schema({

    name: String,
    size: String,
    amt: Number,
    description: String,
    image: String,
    available: Boolean,
    price: Number,
    items: Array



});

module.exports = mongoose.model('Checkout', CheckoutSchema);