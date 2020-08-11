var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThumbnailSchema = new Schema({
    name: String,
    thumbnail: String


});

module.exports = mongoose.model('Thumbnail', ThumbnailSchema );

