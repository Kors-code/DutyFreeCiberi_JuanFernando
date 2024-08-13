'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = Schema({
    identificacion: { type: String },
    name: {type:String, uppercase: true},
    surname: {type:String, uppercase: true},
    email: { type: String, required: true, unique: true, lowercase: true },
    password: String,
    estado: String, //activo, inactivo, suspendido etc. 
    image: String, // imagen de perfil de usuario.
    firma:Schema.Types.Mixed, // imagen de firma de usuario.
    portada:String, // imagen de portada de perfil.
    origen:String, // fuente de ingreso generador o vinculado.
    perfil:String, // frace de perfil de usuario. 
    rol:String, // credenciales predetermindas.
    company:Schema.Types.Mixed,
    operaciones:Schema.Types.Mixed,
    modulos:Schema.Types.Mixed,
    celular:Number,
    codigo_val:Number,
    calificaciones:Schema.Types.Mixed,
    terminos: Boolean,
    emails: Boolean,
    ubicaciones:Schema.Types.Mixed,
    color:String,
    cargo:String,
    
    confirm:Boolean,
    created_at: Date,
    update_at: Date,  
});

module.exports = mongoose.model('Users', UserSchema);