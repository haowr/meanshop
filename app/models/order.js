var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validate = require('mongoose-validator');

var Schema = mongoose.Schema;

var countryValidator = [
    validate({
        validator:'isLength',
        arguments:[1,40],
        message:'Country must be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

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
var zipcodeValidator = [
    validate({
        validator: 'matches',
        arguments: /^\d{5}$/,
        message: "The ZipCode must contain 5 digits"

    })

];
var postalcodeValidator = [
    validate({
        validator: 'matches',
        arguments: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        message: "Please enter a valid postal code..."

    })

];
var phoneNumberValidator = [
    validate({
        validator:'matches',
        arguments:/^[2-9]\d{2}-\d{3}-\d{4}$/,
        message:"Phone Number must be 7 or 10 digits. Dashes Periods or Spaces allowed..."

    })

];

var OrderSchema = new Schema({

    billingcountry:{ type: String, required: true},
    billingfirstname:{ type: String, required: true},
    billinglastname: { type: String, required: true},
    billingstreet: {type: String, required:true},
    billingstreet2: { type: String},
    billingapt: { type: String},
    billingcity:{ type: String},
    billingprovince:{type:String},
    billingpostalcode:{ type: String, required: true},
    billingphonenumber:{ type: String, required: true},
    shippingcountry:{ type: String, required: true},
    shippingfirstname:{ type: String, required: true},
    shippinglastname: { type: String, required: true},
    shippingstreet: {type: String, required:true},
    shippingstreet2: { type: String},
    shippingapt: { type: String},
    shippingcity:{ type: String},
    shippingpostalcode:{ type: String, required: true},
    shippingphonenumber:{ type: String, required: true},
    shippingprovince:{type:String},
    cccardname:{type:String},
    cccardnumber:{type:String},
    ccexpmonth:{type:String},
    ccexpyear:{type:String},
    ccsecuritycode:{type:String},
    ccgrandtotal:{type:String},
    ccstripetoken:{type:String}


});

module.exports = mongoose.model('Order', OrderSchema);