'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema =  Schema({
    name : String,
    code : Number,
    price : Number,
    description : String,
    image : String 
});

module.exports = mongoose.model('Product', ProjectSchema);