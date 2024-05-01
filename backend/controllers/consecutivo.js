
var Consecutivo = require('../models/consecutivo');

function saveConsecutivo(req, res){
    
    var consecutivo = new Consecutivo();
    var params = req.body;
   
    consecutivo.created_at = params.created_at;
    consecutivo.update_at = params.update_at;
    consecutivo.operacion = params.operacion;
    consecutivo.prefix = params.prefix;
    consecutivo.consecutivo  = params.consecutivo;
    consecutivo.resolucion = params.resolucion;
    consecutivo.protocolo = params.protocolo
    consecutivo.tienda = params.tienda
    consecutivo.tienda_id = params.tienda_id

    consecutivo.created_at = params.created_at
    consecutivo.update_at = params.update_at
      
    consecutivo.save((err, result) => {
       if(err){
            res.status(500).send({message: 'Error al Guardar Consecutivo'});
        }else {
            if(!result){
                res.status(404).send({message: 'No se ha Guardado el Consecutivo'});
            }else {
                res.status(200).send(result);
                }
            }
    });
}

function getConsecutivoOperacion(req, res){

    var OperacionId = req.params.id;
    // console.log(OperacionId);
    Consecutivo.find({operacion:OperacionId}, (err, response) => {
       if(err){
            res.status(500).send({message: 'Error al consultar listado'});
        }else {
            if(!response){
                res.status(404).send({message: 'No se ha encontrado el listdo'});
            }else {
                res.status(200).send(response);

                }
            }
    });
}

function deleteConsecutivo(req, res){
    var Id = req.params.id;
    console.log(Id);
    Consecutivo.findByIdAndRemove(Id, (err, consecutivo) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar Consecutivo'});
        }else {
            if(!consecutivo){
                res.status(404).send({message: 'No se ha Eliminado el Consecutivo'});
            }else {
                res.status(200).send(consecutivo);
                }
            }
    });
}

function updateConsecutivo(req, res){
var Id = req.body._id;
var update = req.body;

Consecutivo.findByIdAndUpdate(Id, update, (err, consecutivo)=>{
    if(err){
        res.status(500).send({message: 'Error al actualizar el Electronica'});
    }else{
        if(!consecutivo){
           res.status(404).send({message: 'No se ha podido Actualizar el Electronica'}); 
        }else{
            res.status(200).send(consecutivo);
            }
        }
});
}


module.exports = {
    saveConsecutivo,
    getConsecutivoOperacion,
    deleteConsecutivo,
    updateConsecutivo    
}