
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var operacionSchema = Schema({   
     token:String,
     factOperacion:Schema.Types.Mixed,
     factSoftware:Schema.Types.Mixed,
     factCertificado:Schema.Types.Mixed,
     factResolucion:Schema.Types.Mixed,
     factResolucionDS:Schema.Types.Mixed,
     factNotaCredito:Schema.Types.Mixed,
     factNotaDebito:Schema.Types.Mixed,
     set_pruebas:String,
     pruebas:Boolean,
     created_at: Date,
     update_at: Date,
     operacion:String,
});

module.exports = mongoose.model('Electronica', operacionSchema);