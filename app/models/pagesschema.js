var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PagesSchema = new Schema ({

    _id: Number,
    pages: [{ type: Schema.Types.ObjectId, ref: 'Shoe'}]


});



mongoose.exports = mongoose.model('Page', PagesSchema);

