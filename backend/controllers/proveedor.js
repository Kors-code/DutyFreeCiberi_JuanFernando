
var Proveedor = require('../models/proveedor');

function saveProveedor(req, res){
    
    var proveedor = new Proveedor();
    var params = req.body;
   
    proveedor.nit = params.nit;
    proveedor.titulo = params.titulo;
    proveedor.telefono = params.telefono;
    proveedor.direccion = params.direccion;
    proveedor.ciudad = params.ciudad;
    proveedor.contacto = params.contacto;
    proveedor.email = params.email;
    

    proveedor.created_at = params.created_at
    proveedor.update_at = params.update_at
      
    proveedor.save((err, result) => {
       if(err){
            res.status(500).send({message: 'Error al Guardar Proveedor'});
        }else {
            if(!result){
                res.status(404).send({message: 'No se ha Guardado el Proveedor'});
            }else {
                res.status(200).send(result);
                }
            }
    });
}

function getProveedores(req, res){
    // var OperacionId = req.params.id;
    // console.log(OperacionId);
    Proveedor.find({}, (err, response) => {
       if(err){
            res.status(500).send({message: 'Error al consultar Proveedor'});
        }else {
            if(!response){
                res.status(404).send({message: 'No se ha encontrado el Proveedor'});
            }else {
                res.status(200).send(response);
                }
            }
    });
}

function getProveedoresTitulo(req, res){
    var Id = req.params.id;
    console.log(Id)

    var dato =  new RegExp( Id, "i");

    Proveedor.find({"titulo": {$regex:dato}})    
            .exec(function(err, finders){
                if(err){
                    res.status(500).send({message: 'Error en Peticion de Proveedores' });
                }else {
                    if(!finders){
                        res.status(404).send({ message: 'No hay Proveedores para mostrar' });
                    }else {
                            res.status(200).send(finders);
                        }
                    }
                });  
}

function deleteProveedor(req, res){
    var Id = req.params.id;
    console.log(Id);
    Proveedor.findByIdAndRemove(Id, (err, consecutivo) => {
       if(err){
            res.status(500).send({message: 'Error al Eliminar el Proveedor'});
        }else {
            if(!consecutivo){
                res.status(404).send({message: 'No se ha Eliminado el Proveedor'});
            }else {
                res.status(200).send(consecutivo);
                }
            }
    });
}

function updateProveedor(req, res){
var Id = req.body._id;
var update = req.body;

Proveedor.findByIdAndUpdate(Id, update, (err, consecutivo)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el Proveedor'});
        }else{
            if(!consecutivo){
            res.status(404).send({message: 'No se ha podido Actualizar el Proveedor'}); 
            }else{
                res.status(200).send(consecutivo);
                }
            }
    });
}


module.exports = {
    saveProveedor,
    getProveedores,
    deleteProveedor,
    updateProveedor,
    getProveedoresTitulo
}