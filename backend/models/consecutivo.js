'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = Schema({
    prefix:String,
    consecutivo:Number,
    resolucion:String,
    operacion:String,
    protocolo:String,
    tienda:String,
    tienda_id:String,
    info:Schema.Types.Mixed,
    created_at: Date,
    update_at: Date,  
});


module.exports = mongoose.model('Consecutivo', Schema);