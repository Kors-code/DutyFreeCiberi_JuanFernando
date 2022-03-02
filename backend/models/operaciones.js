'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var operacionSchema = Schema({
    estado: String,
    codigo: { type: String, required: true,  },
    titulo: { type: String, uppercase: true, required: true},
    pais: {type:String, uppercase: true},
    departamento: {type:String, uppercase: true},
    ciudad: {type:String, uppercase: true},
    direccion:String,
    ubicacion:Schema.Types.Mixed,
    registro:String,
    nombre:String,
    telefono: Number,
    mts2: Number,
    ciberiUsers:Schema.Types.Mixed,
    email: {type:String, lowercase: true},
    responsable:{type:String, uppercase: true},
    horarios: Schema.Types.Mixed,
    tipo:String,
    company:String,
    album: String,
    ficha: String,
    configuracion: Schema.Types.Mixed,
    wompi:Schema.Types.Mixed,
    ip_servidor:String,
    img:String,
    nombreRed:String,
    claveRed:String,
    coordinates: Schema.Types.Mixed,
    coordenadas: Schema.Types.Mixed,
    mediosdepago: Schema.Types.Mixed,
    domicilio: Schema.Types.Mixed,
    autoservicio: Schema.Types.Mixed,
    calificaciones: Schema.Types.Mixed,
    reserva: Schema.Types.Mixed,
    abierto: Schema.Types.Mixed,
    imagenes:Schema.Types.Mixed,
    plazoleta:Schema.Types.Mixed,
    
    created_at: Date,
    update_at: Date
});

module.exports = mongoose.model('Operaciones', operacionSchema);