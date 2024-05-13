'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = Schema({

    nit:String,
    titulo:String,
    telefono:String,
    direccion:String,
    ciudad:String,
    contacto:String,
    email:String,
    email:String,

    created_at: Date,
    update_at: Date,  
});

Schema.plugin(mongoosePaginate);

module.exports = mongoose.model('proveedor', Schema);