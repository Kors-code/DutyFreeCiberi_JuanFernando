

var Operacion = require('../models/operaciones');

function saveOperacion(req, res){

    
    var operacion = new Operacion();
    var params = req.body;
    console.log(params)

    operacion.codigo = params.codigo;
    operacion.titulo = params.titulo;
    operacion.img = params.img;
    operacion.created_at = new Date();
      
    operacion.save((err, Operacion) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar operacion'});
        }else {
            if(!Operacion){
                res.status(404).send({message: 'No se ha Eliminado el operacion'});
            }else {
                res.status(200).send(Operacion);
                }
            }
    });
}

function getOperaciones(req, res){
    // var OperacionId = req.params.id;
    // console.log(OperacionId);
    Operacion.find({}, (err, Operaciones) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar operacion'});
        }else {
            if(!Operaciones){
                res.status(404).send({message: 'No se ha Eliminado el operacion'});
            }else {
                res.status(200).send(Operaciones);

                }
            }
    });
}

function deleteOperacion(req, res){
      
    var OperacionId = req.params.id;
    console.log(OperacionId);
    Operacion.findByIdAndRemove(OperacionId, (err, OperacionRemove) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar Usuario'});
        }else {
            if(!OperacionRemove){
                res.status(404).send({message: 'No se ha Eliminado el Usuario'});
            }else {
                res.status(200).send({Operacion: OperacionRemove});

                }
            }
    });
}



function updateOperacion(req, res){
var OperacionId = req.body._id;
var update = req.body;

Operacion.findByIdAndUpdate(OperacionId, update, (err, OperacionUpdate)=>{
    if(err){
        res.status(500).send({message: 'Error al actualizar el Usuario'});
    }else{
        if(!OperacionUpdate){
           res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
        }else{
            res.status(200).send({Operacion: OperacionUpdate});
            }
        }
});
}


module.exports = {
    deleteOperacion,
    updateOperacion,
    saveOperacion,
    getOperaciones
}