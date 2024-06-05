
var Electronica = require('../models/electronica');

function saveElectronica(req, res){
    
    var electronica = new Electronica();
    var params = req.body;
    electronica.token = params.token;
    electronica.factOperacion = params.factOperacion;
    electronica.factSoftware = params.factSoftware;
    electronica.factCertificado = params.factCertificado;
    electronica.factResolucion = params.factResolucion;
    electronica.factResolucionDS = params.factResolucionDS;
    electronica.factNotaCredito = params.factNotaCredito;
    electronica.factNotaDebito = params.factNotaDebito;
    electronica.set_pruebas = params.set_pruebas;
    electronica.pruebas = params.pruebas;
    electronica.created_at = params.created_at;
    electronica.update_at = params.update_at;
    electronica.operacion = params.operacion;
    electronica.factResoluciones = params.factResoluciones;
    electronica.operacion = params.operacion;
    electronica.created_at = new Date();
      
    electronica.save((err, electronica) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar Electronica'});
        }else {
            if(!electronica){
                res.status(404).send({message: 'No se ha Eliminado el Electronica'});
            }else {
                res.status(200).send(electronica);
                }
            }
    });
}

function getElectronica(req, res){
    var OperacionId = req.params.id;
    // console.log(OperacionId);
    Electronica.findOne({operacion:OperacionId}, (err, electronica) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar Electronica'});
        }else {
            if(!electronica){
                res.status(404).send({message: 'No se ha Eliminado el Electronica'});
            }else {
                res.status(200).send(electronica);

                }
            }
    });
}

function deleteElectronica(req, res){
      
    var Id = req.params.id;
    console.log(Id);
    Electronica.findByIdAndRemove(Id, (err, electronica) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar Electronica'});
        }else {
            if(!electronica){
                res.status(404).send({message: 'No se ha Eliminado el Electronica'});
            }else {
                res.status(200).send(electronica);

                }
            }
    });
}

function updateElectronica(req, res){
var Id = req.body._id;
var update = req.body;

Electronica.findByIdAndUpdate(Id, update, (err, electronica)=>{
    if(err){
        res.status(500).send({message: 'Error al actualizar el Electronica'});
    }else{
        if(!electronica){
           res.status(404).send({message: 'No se ha podido Actualizar el Electronica'}); 
        }else{
            res.status(200).send(electronica);
            }
        }
});
}


module.exports = {
    saveElectronica,
    getElectronica,
    deleteElectronica,
    updateElectronica
    
}