var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailListSchema = new Schema({

 
    email:{type:String, lowercase:true, unique:true}
    
    


});

module.exports = mongoose.model('Email', EmailListSchema);