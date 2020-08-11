var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GuestSchema = new Schema({

    wishlist: Array,
    hearts: Number




});

module.exports = mongoose.model('Guest', GuestSchema);