
var Compra = require('../models/compra');
var Consecutivo = require('../models/consecutivo');

function saveCompra2(req, res){
    
    var compra = new Compra();
    var params = req.body;
    compra.consecutivo= params.consecutivo;
    compra.estado= params.estado;
    compra.tienda= params.tienda;
    compra.operacion= params.operacion;
    compra.protocolo= params.protocolo;
    compra.proveedor= params.proveedor;
    compra.solicita_nombre= params.solicita_nombre;
    compra.solicita_cargo= params.solicita_cargo;
    compra.solicita_area= params.solicita_area;
    compra.cotizaciones= params.cotizaciones;
    compra.total= params.total;
    compra.impuestos= params.impuestos;
    compra.descuento= params.descuento;
    compra.observaciones= params.observaciones;
    compra.mediosPago= params.mediosPago;
    compra.productos= params.productos;
    compra.autorizaciones = params.autorizaciones;
    compra.fecha_entrega = params.fecha_entrega;
    compra.fecha_pago = params.fecha_pago;
    compra.condiciones_pago = params.condiciones_pago;

    compra.created_at = params.created_at
    compra.update_at = params.update_at
      
    compra.save((err, result) => {
       if(err){
            res.status(500).send({message: 'Error al Guardar Orden de Compra'});
        }else {
            if(!result){
                res.status(404).send({message: 'No se ha Guardado la Orden de Compra'});
            }else {
                res.status(200).send(result);
                }
            }
    });
}


function saveCompra(req, res){
    
    var params = req.body;

    Consecutivo.findOneAndUpdate({prefix:'OC'},{ $inc: {"consecutivo": 1 }}).exec(function(err, consec){
        if(err){
            //err)
            res.status(500).send({message: 'Error en Peticion' + err });
        }else {
            if(!consec){
                res.status(404).send({ message: 'No Hay Configuraciòn de Consecutivos ' });
            }else {
                var compra = new Compra();
                compra.consecutivo= consec.consecutivo;
                compra.estado= params.estado;
                compra.tienda= params.tienda;
                compra.operacion= params.operacion;
                compra.protocolo= consec.protocolo;
                compra.proveedor= params.proveedor;
                compra.solicita_nombre= params.solicita_nombre;
                compra.solicita_cargo= params.solicita_cargo;
                compra.solicita_area= params.solicita_area;
                compra.cotizaciones= params.cotizaciones;
                compra.total= params.total;
                compra.impuestos= params.impuestos;
                compra.descuento= params.descuento;
                compra.observaciones= params.observaciones;
                compra.mediosPago= params.mediosPago;
                compra.productos= params.productos;
                compra.autorizaciones = params.autorizaciones;
                compra.fecha_entrega = params.fecha_entrega;
                compra.fecha_pago = params.fecha_pago;
                compra.condiciones_pago = params.condiciones_pago;

                compra.created_at = params.created_at
                compra.update_at = params.update_at
                
                
                compra.save((err, result) => {
                    if(err){
                         res.status(500).send({message: 'Error al Guardar Orden de Compra'});
                     }else {
                         if(!result){
                             res.status(404).send({message: 'No se ha Guardado la Orden de Compra'});
                         }else {
                             res.status(200).send(result);
                             }
                         }
                 });
            }
        }
    })
}

function getComprasOperacion(req, res){
    // var OperacionId = req.params.id;
    // console.log(OperacionId);
    Compra.find({}, (err, response) => {
       if(err){
            res.status(500).send({message: 'Error al consultar Orden de Compra'});
        }else {
            if(!response){
                res.status(404).send({message: 'No se ha encontrado la Orden de Compra'});
            }else {
                res.status(200).send(response);
                }
            }
    });
}

function deleteCompra(req, res){
    var Id = req.params.id;
    console.log(Id);
    Compra.findByIdAndRemove(Id, (err, consecutivo) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar la Orden de Compra'});
        }else {
            if(!consecutivo){
                res.status(404).send({message: 'No se ha Eliminado la Orden de Compra'});
            }else {
                res.status(200).send(consecutivo);
                }
            }
    });
}

function updateCompra(req, res){
var Id = req.body._id;
var update = req.body;

    Compra.findByIdAndUpdate(Id, update, (err, consecutivo)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar la Orden de Compra'});
        }else{
            if(!consecutivo){
            res.status(404).send({message: 'No se ha podido Actualizar la Orden de Compra'}); 
            }else{
                res.status(200).send(consecutivo);
                }
            }
    });
}


module.exports = {
    saveCompra,
    getComprasOperacion,
    deleteCompra,
    updateCompra
}