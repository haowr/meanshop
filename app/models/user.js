var mongoose        = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema          = mongoose.Schema;
var bcrypt          = require('bcrypt-nodejs');
var titlize        = require('mongoose-title-case');
var validate        = require('mongoose-validator');
var nodemailer      = require('nodemailer');
var stTransport     = require('nodemailer-sendgrid-transport');





//keep validations on the backend...frontend they can be bypassed by a hacker

var nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
        message: 'Name must be at least 3 characters, max 40, no special characters or numbers, must have space in between name...'
    }),
    validate({
        validator: 'isLength',
        arguments: [3,40],
        message: 'Name must be between, {ARGS[0]} and {ARGS[1]} characters...'
    })
];
var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d]).{8,35}$/,
        message: 'Password needs to have at least one lower case, one uppercase, one number,  and must be at least 8 characters but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [8,35],
        message: 'Password must be between, {ARGS[0]} and {ARGS[1]} characters...'
    })
];
///^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/, regex requireing symbols

var emailValidator = [
    validate({
        validator: 'isEmail',
        
        message: 'Is not a valid e-mail'
    }),
    validate({
        validator: 'isLength',
        arguments: [3,25],
        message: 'Email must be between, {ARGS[0]} and {ARGS[1]} characters...'
    })
    
];
var usernameValidator = [
        validate({
        validator: 'isLength',
        arguments: [3,25],
        message: 'Name must be between, {ARGS[0]} and {ARGS[1]} characters.'
    }),
        validate({
        validator: 'isAlphanumeric',
        
        message: 'Username must contains letters or numbers only...'
    })
];

var UserSchema = new Schema({
    name: {type: String, required: true, validate: nameValidator},
    username: { type: String, lowercase: true, required: true, unique: true, dropDups: true },
    password: { type: String, required: true,validate:passwordValidator, select:false},
    email: { type: String, required: true, lowercase: true, unique: true, dropDups: true, validate:emailValidator},
    active: { type: Boolean, required: true, default: false },
    temporarytoken: {type: String, required: true},
    resettoken:{type: String, required: false},
    permission: {type:String, required:true, default:'user' },
    products:{type:Array},
    shoppingbag:{type:Array},
    totalaftercoupon:{type:Number},
    shippingchoice:{type:String},
    orders:{type:Array},
    totalhistory:{type:Array},
    billingdetails:{type:Object},
    shippingdetails:{type:Object},
    ccdetails:{type:Object},
    ordersgrouped:{type:Array},
    ordernumber:{type:Number},
    orderhistory:{type:Array},
    storeorders:{type:Array},
    storehistory:{type:Array},
    detailssaved:{type:Boolean},
    loves: Array



});
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save',function(next){

    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();

    });
});
/**UserSchema.pre('findOneAndUpdate', function(next){

   var securitycode = this;
    //console.log(securitycode.tree);
    console.log(securitycode.getUpdate());
    var details = securitycode.getUpdate();
    console.log(details.$set);
 //this.findOneAndUpdate({}, { password: bcrypt.hash(this.getUpdate().$set.password) });
 if(details.$set.ccdetails){
     bcrypt.hash(details.$set.ccdetails.securitycode,null,null, function(err,hash){
        if(err) return next(err);
        details.$set.ccdetails.securitycode = hash;
        next();
         });
 }else{
     next();
 }

})
8*/
// Attach some mongoose hooks 
UserSchema.plugin(titlize, {
  paths: [ 'name' ] // Array of paths 
 
});
 
UserSchema.methods.comparePassword = function(password){

    return bcrypt.compareSync(password,this.password);
};

//var Model = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);

var User = mongoose.model('User', UserSchema);

//User.on('index', function(err) { 
  //  console.log(err); 
//});

