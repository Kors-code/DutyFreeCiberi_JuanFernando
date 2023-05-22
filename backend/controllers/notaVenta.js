
var NotaVenta = require('../models/notaVenta');
var Consecutivo = require('../models/consecutivo');


function saveNotaVenta(req, res){
    
    var params = req.body;

    Consecutivo.findOneAndUpdate({tienda:params.tienda},{ $inc: {"consecutivo": 1 }}).exec(function(err, consec){
        if(err){
            //err)
            res.status(500).send({message: 'Error en Peticion' + err });
        }else {
            if(!consec){
                res.status(404).send({ message: 'No Hay Configuraciòn de Consecutivos ' });
            }else {
    
                var notaVenta = new NotaVenta();
                notaVenta.created_at = params.created_at;
                notaVenta.update_at = params.update_at;
                notaVenta.consecutivo= consec.consecutivo;
                notaVenta.prefix= consec.prefix;
                notaVenta.estado=params.estado;
                notaVenta.tienda=params.tienda;
                notaVenta.operacion=params.operacion;
                notaVenta.resolucion=consec.resolucion;
                notaVenta.protocolo=consec.protocolo;
                notaVenta.usuario=params.usuario;
                notaVenta.cliente=params.cliente;
                notaVenta.vendedor=params.vendedor;
                notaVenta.tienda_id=params.tienda_id;
                notaVenta.info=params.info;
                notaVenta.total=params.total;
                notaVenta.trm=params.trm;
                notaVenta.mediosPago=params.mediosPago;
                notaVenta.productos=params.productos;
                
                
                notaVenta.save((err, result) => {
                if(err){
                    console.log(err)
                        res.status(500).send({message: 'Error al Guardar Nota de venta'});
                    }else {
                        if(!result){
                            res.status(404).send({message: 'No se ha Guardado la Nota de venta'});
                        }else {
                            res.status(200).send(result);
                            }
                        }
                });
            }
        }
    })
}

function getNotaVentaUser(req, res){

    var Id = req.params.id;
    // console.log(OperacionId);
    NotaVenta.find({"usuario._id":Id}, (err, response) => {
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

function deleteCuadre(req, res){
    var Id = req.params.id;
    console.log(Id);
    Cuadre.findByIdAndRemove(Id, (err, consecutivo) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar Cuadre'});
        }else {
            if(!consecutivo){
                res.status(404).send({message: 'No se ha Eliminado el Cuadre'});
            }else {
                res.status(200).send(consecutivo);
                }
            }
    });
}

function updateCuadre(req, res){
var Id = req.body._id;
var update = req.body;

Cuadre.findByIdAndUpdate(Id, update, (err, consecutivo)=>{
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
    saveNotaVenta,
    getNotaVentaUser

}