'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = Schema({

    consecutivo:Number,
    prefix:String,
    estado:String,
    tienda:String,
    operacion:String,
    resolucion:String,
    protocolo:String,
    usuario:Schema.Types.Mixed,
    cliente:Schema.Types.Mixed,
    vendedor:Schema.Types.Mixed,
    tienda_id:String,
    info:String,
    total:Number,
    trm:Number,
    mediosPago:Schema.Types.Mixed,
    productos:Schema.Types.Mixed,

    created_at: Date,
    update_at: Date,  
    
});


module.exports = mongoose.model('NotaVenta', Schema);