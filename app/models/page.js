var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({

    pages:{type: Array, unique: true}

});

module.exports = mongoose.model('Page', PageSchema);
