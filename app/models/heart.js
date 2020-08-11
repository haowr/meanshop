var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeartSchema = new Schema({
        Name: String,
        hearts: Number,
        activatedby:{type:Array, dropDups:true}


});


module.exports = mongoose.model('Heartcount',HeartSchema);