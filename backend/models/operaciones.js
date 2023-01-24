'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var operacionSchema = Schema({
    codigo: { type: String, required: true,  },
    titulo: { type: String, uppercase: true, required: true},
    pais: {type:String, uppercase: true},
    departamento: {type:String, uppercase: true},
    ciudad: {type:String, uppercase: true},
    direccion:String,
    ubicacion:Schema.Types.Mixed,
    created_at: Date,
    update_at: Date,
    operacion:String,
});

module.exports = mongoose.model('Operaciones', operacionSchema);