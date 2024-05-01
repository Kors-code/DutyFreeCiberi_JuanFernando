'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = Schema({
    consecutivo:Number,
    estado:String,
    tienda:Schema.Types.Mixed,
    operacion:Schema.Types.Mixed,
    protocolo:Schema.Types.Mixed,
    proveedor:Schema.Types.Mixed,
    solicita_nombre:{ type: String, uppercase: true, required: true},
    solicita_cargo:{ type: String, uppercase: true, required: true},
    solicita_area:{ type: String, uppercase: true, required: true},
    cotizaciones:Schema.Types.Mixed,
    total:Number,
    impuestos:Number,
    descuento:Number,
    observaciones:Schema.Types.Mixed,
    mediosPago:Schema.Types.Mixed,
    productos:Schema.Types.Mixed,
    autorizaciones:Schema.Types.Mixed,
    fecha_entrega: Date,
    fecha_pago: Date,
    condiciones_pago:Schema.Types.Mixed,

    created_at: Date,
    update_at: Date,  
});

Schema.plugin(mongoosePaginate);

module.exports = mongoose.model('compra', Schema);