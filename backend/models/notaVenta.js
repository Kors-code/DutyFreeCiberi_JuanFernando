'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = Schema({

    consecutivo:Number,
    prefix:String,
    estado:String,
    folio:String,
    tienda:String,
    operacion:String,
    resolucion:String,
    protocolo:String,
    usuario:Schema.Types.Mixed,
    cliente:Schema.Types.Mixed,
    vendedor:Schema.Types.Mixed,
    cajero:Schema.Types.Mixed,
    tienda_id:String,
    info:String,
    total:Number,
    trm:Number,
    descuento:Number,
    trm_euro:Number,
    mediosPago:Schema.Types.Mixed,
    productos:Schema.Types.Mixed,
    observaciones:String,

    created_at: Date,
    update_at: Date,  
    
});


module.exports = mongoose.model('NotaVenta', Schema);