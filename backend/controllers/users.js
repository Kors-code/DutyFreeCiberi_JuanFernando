'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var Operaciones = require('../models/operaciones');


const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');


var mg = require('nodemailer-sendgrid-transport');


// var nodemailerSendGrid = nodemailer.createTransport(mg(auth));


function prueba(req, res){
    res.status(200).send({
        messge: 'Prueba Controlador de Usuario'
    });
}


function getUsers(req, res){
        User.find( {}, (err, usuarios)=> {
            if(err){
                res.status(500).send({message: 'Error en Peticion de usuarios' });
            }else {
                if(!usuarios){
                    res.status(404).send({ message: 'No hay usuarios para mostrar' });
                }else {
                    res.status(200).send({ usuarios });
                }
            }   
        });

}

function getUserEmail(req, res){
        var id = req.params.id;
        User.findOne({email: id},{email:true, confirm:true}, (err, user)=> {
            if(err){
                res.status(500).send({message: 'Error en Peticion Consulta de Usuario' });
            }else {
                if(!user){
                    res.status(404).send({ message: 'Usuario No Existe' });
                }else {       
                    Operaciones.populate(user, {path: 'operaciones'},(err, user)=> {
                        if(err){
                            res.status(500).send({message: 'Error en Peticion' });
                        }else {
                            res.status(200).send({ user });
                        }
                    });

                }
            }
            
        });

}

function getUserId(req, res, next){
    var Id = req.params.id;
    User.findById(Id).exec(function(err, finders){    
        if(err){
                res.status(500).send({message: 'Error en Peticion de Negocios' });
            }else {
                if(!finders){
                    res.status(404).send({ message: 'No hay Negocios para mostrar' });
                }else {
                        res.status(200).send({ user : finders });
                       }
                }
        });   
}


function getUserCompany(req, res){
        var Id = req.params.id;
        // console.log('id 100 ' + Id)
        User.find({company: Id}, (err, users)=> {
            if(err){
                res.status(500).send({message: 'Error en Peticion Consulta de Contactos' });
            }else {
                if(!users){
                    res.status(404).send({ message: 'No Existen Contactos' });
                }else {
                    
                    res.status(200).send({ users });

                }
            }
            
        });

}

function getUserOperaciones(req, res){
    var Id = req.params.id;
    User.find({"operaciones._id": Id},{email:true, name:true,  surname:true, confirm:true, color:true}, (err, users)=> {
        if(err){
            res.status(500).send({message: 'Error en Peticion Consulta de Contactos' });
        }else {
            if(!users){
                res.status(404).send({ message: 'No Existen Contactos' });
            }else {
                
                Operaciones.populate(users, {path: 'operaciones'},(err, users)=> {
                    if(err){
                        res.status(500).send({message: 'Error en Peticion' });
                    }else {
                        res.status(200).send({ users });
                    }
                });

            }
        }
        
    });

}

function registerUser(req, res){
        
            var user = new User();
            var params = req.body;
            // console.log(params);
            user.identificacion = params.identificacion,
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email;
            user.estado = params.estado;
            user.image = params.image;
            user.portada = params.portada;
            user.perfil = params.perfil;
            user.origen = params.origen;
            user.rol = params.rol;
            user.confirm = false;
            user.color = params.color;
        
            user.created_at = new Date();
            
                        user.save((err, userStored) => {
                            if(err){
                                console.log(err);
                                res.status(500).send({message: err});
                                
                            }else{
                                if(!userStored){
                                    res.status(404).send({message: 'Nos se ha registrado el Usuario'});
                                }else {
                                
                                        let Id = userStored.email;
                                        var   context = {
                                                userName: userStored.name,
                                                userSurname: userStored.surname,
                                                userEmail: userStored.email,
                                                userId: userStored._id,
                                                href: 'https://restobar.app/register-confirm/'+ Id
                                            };

                                            let handlebarOptions = {
                                                viewEngine: {
                                                  extName: '.hbs',
                                                  partialsDir: 'backend/partial/',
                                                  layoutsDir:  undefined,
                                                  defaultLayout: undefined,
                                                },
                                                viewPath: 'backend/email/',
                                                extName: '.hbs',
                                              };
                                        
                                            // nodemailerSendGrid.use('compile', hbs(handlebarOptions))
                                        
                                            // nodemailerSendGrid.use('compile', hbs({
                                            //     viewPath: 'backend/email',
                                            //     extName:'.hbs',
                                            //     helpers: helpers
                                            // }))
                                        
                                        
                                            //  nodemailerSendGrid.sendMail({
                                            //      from: 'RestoBar.app <noreply@restobar.app>',
                                            //      to: to, // An array if you have multiple recipients.
                                            //      subject: 'Confirmación de Registro Bienvenido',
                                            //      template:  'subscripcion',
                                            //      context: context 
                                                
                                                
                                            //    }, function (err, info) {
                                            //      if (err) {
                                            //        console.log('Error: ' + err);
                                            //        res.status(200).send({ err });
                                            //      }
                                            //      else {
                                         
                                            //        res.status(200).send({info});
                                            //      }
                                            //  });

                                            // nodemailerMailgun.sendMail({
                                            //     from: '✔ Process Basic <postmaster@mg.processbasic.com>',
                                            //     to: context.userEmail, // An array if you have multiple recipients.
                                            //     // to: 'processbasic@gmail.com',
                                            //     subject: 'Confirmacion de Registro ✔',
                                            //     template: {
                                            //       name: 'backend/email/subscripcion.hbs',
                                            //       engine: 'handlebars',
                                            //       context: context
                                            //     }
                                            //   }, function (err, info) {
                                            //     if (err) {
                                            //     //   console.log('Error: ' + err);
                                            //       res.status(200).send({ err });
                                            //     }
                                            //     else {
                                            //     //   console.log('Response: ' + info);
                                            //     //   res.status(200).send({ info });
                                            //       res.status(200).send({user: userStored});
                                            //     }
                                            // });
                                }  
                        }
                    })
}

function confirmUser(req, res){
    var params = req.body;
    // console.log(params);
    var email = params.email;
    var Id = req.params.id;
    // console.log(Id);

    User.findById(Id, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en Peticion'});
        }else{
            if(!user){
               res.status(404).send({message: 'Usuario No Registrado, Verifique Email en Formulario'}); 
            }else{   
                // console.log({id: Id});
                // console.log({usuerid: user._id});              
                if(Id == user._id){
                    bcrypt.hash(params.password, null, null, function(err, hash){
                            params.password = hash;
                            // console.log(params);
                            User.findOneAndUpdate({_id: user._id}, params, (err, userUpdate)=>{
                                if(err){
                                    console.log(err);
                                    // console.log(user._id);
                                    res.status(500).send({message: 'Error al Confirmar la Subscripcion'});
                                }else{
                                    if(!userUpdate){
                                        res.status(404).send({message: 'No se ha Confirmado la Subscripcion '}); 
                                    }else{
                                            console.log(user._id);
                                            res.status(200).send({user: userUpdate});
                                            }
                                        }
                            });
                        });
                }else{
                   res.status(404).send({message: 'Usuario no Identificado correctamente'}); 
                }
            }
        }
    });
}


function saveUser (req, res){
    var to = [];
    var user = new User();
    var params = req.body;
    // console.log(params);
    user.identificacion = params.identificacion,
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.estado = params.estado;
    user.image = params.image;
    user.portada = params.portada;
    user.perfil = params.perfil;
    user.origen = params.origen;
    user.rol = params.rol;
    user.modulos = params.modulos;
    user.confirm = true;
    user.operaciones = params.operaciones;
    user.company = params.company;
    user.created_at = new Date();
    bcrypt.hash(params.password, null, null, function(err, hash){
        user.password = hash;
        // console.log(params);
        user.save((err, userStored) => {
            if(err){
                console.log(err);
                res.status(500).send({message: err});
                
            }else{
                if(!userStored){
                    res.status(404).send({message: 'Nos se ha registrado el Usuario'});
                }else {
                    res.status(200).send({user: userStored});
                }
            }
        });
    });

}
                                 

function restablecerPassword(req, res){

        // var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
        var contraseña = "AAAA";
        // for (var i=0; i<6; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));

        // console.log(contraseña)

        var email = req.params.id;
        // encrptar contraseña
        bcrypt.hash(contraseña, null, null, function(err, hash){
             var pass = hash;
        User.findOneAndUpdate({email: email}, {password: pass}, (err, userUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error al Reestablcer Contraseña el Usuario'});
        }else{
            if(!userUpdate){
               res.status(404).send({message: 'No se ha podido Actualizar la contraseña'}); 
            }else{
                res.status(200).send(userUpdate);
            }
        }
    });
  });
}

function deleteUser(req, res){
      
        var userId = req.params.id;
        console.log(userId);
        User.findByIdAndRemove(userId, (err, userRemove) => {
           if(err){
                res.status(500).send({message: 'Error al Eliminar Usuario'});
            }else {
                if(!userRemove){
                    res.status(404).send({message: 'No se ha Eliminado el Usuario'});
                }else {
                    res.status(200).send({user: userRemove});

                    }
                }
        });
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el Usuario'});
        }else{
            if(!userUpdate){
               res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
            }else{
                res.status(200).send({user: userUpdate});
                }
            }
    });
}

function AdminUpdateUser(req, res){
    var userId = req.params.id;
    var update = req.body;


      User.findByIdAndUpdate(userId, update).exec(function(err, finders){    
        if(err){
                res.status(500).send({message: 'Error en Peticion de Usuario' });
            }else {
                if(!finders){
                    res.status(404).send({ message: 'No hay Usuarios para mostrar' });
                }else {
                        res.status(200).send({ user : finders });
                       }
                }
        });  

    // User.findByIdAndUpdate(userId, update, (err, userUpdate)=>{
    //     if(err){
    //         res.status(500).send({message: 'Error al actualizar el Usuario'});
    //     }else{
    //         if(!userUpdate){
    //            res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
    //         }else{
    //             res.status(200).send({user: userUpdate});
    //             }
    //         }
    // });
}

function loginUser1(req, res){
    // console.log('ingreso logeo');
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en Peticion'});
        }else{
            if(!user){
               res.status(404).send({message: 'Usuario No Registrado, Verifique sus Credenciales'}); 
            }else{
                //Comprobamos contraseñas
                bcrypt.compare(password, user.password, (err, check) =>{
                        if(check){
                            //deborver el usuario Logeado
                            if(params.gethash){
                                // debolver un token de jwt
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });

                            }else{
                                User.findOne( {_id: user._id}).sort({created_at: 'desc'}).populate('company',{ titulo: true, actividad_economica: true, pais:true,  portada:true, users:true})
                                        .populate('operaciones',{ titulo: true, ciudad: true, tipo: true, company:true})
                                        .populate("modulos",{ title: true, descripcion: true}).exec(function (err, finder) {
                                        if(err){
                                            res.status(500).send({message: 'Error en Peticion de Autenticacion' });
                                        }else {
                                            if(!finder){
                                                res.status(404).send({ message: 'No hay Usuario para Autenticar..' });
                                            }else {
                                                
                                                res.status(200).send({user :finder});
                                            }
                                    }   
                                });
                        }
            
                    }else {
                         res.status(404).send({message: 'Usuario No Logeado, Verifique los Datos de Ingreso'}); 
                    }
                })
            }
        }
    });
}

function loginUser(req, res){
   
    var params = req.body;
    var email = params.email;
    var password = params.password;
    // console.log(params.email);
    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            // console.log(err);
            res.status(500).send({message: 'Error en Peticion'});
        }else{
            if(!user){
               res.status(404).send({message: 'Usuario No Registrado, Verifique sus Credenciales'}); 
            }else{
               // console.log('640' + user)
                //Comprobamos contraseñas
                bcrypt.compare(password, user.password, (err, check) =>{
                        if(check){
                            //deborver el usuario Logeado
                            if(params.gethash){
                                // debolver un token de jwt
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });

                            }else{
                                User.findOne( {_id: user._id})
                                       .exec(function (err, finder) {
                                        if(err){
                                            res.status(500).send({message: 'Error en Peticion de Autenticacion' });
                                        }else {
                                            if(!finder){
                                                res.status(404).send({ message: 'No hay Usuario para Autenticar..' });
                                            }else {
                                                
                                                res.status(200).send({user :finder});
                                            }
                                    }   
                                });
                        }
            
                    }else {
                         res.status(404).send({message: 'Usuario No Logeado, Verifique los Datos de Ingreso'}); 
                    }
                })
            }
        }
    });
}


function tokenUserAutoservicio(req, res){
    var Update = req.body;
    res.status(200).send({
        token: jwt.createToken(Update)
    });
}

function getConteoUsers(req, res){

    User.find({},{name:true}).exec(function(err, count) {
        if(err){
            // console.log(err)
            res.status(500).send({message: 'Error en Peticion de usuarios' });
        }else {
            if(!count){
                // console.log(count)
                res.status(404).send({ message: 'No hay usuarios para mostrar' });
            }else {
                // console.log(count)
                res.status(200).send(count);
            }
        }   
    });

}


    function addUserAdminOperaciones(req, res){
         var Id = req.params.id;
         var Update = req.body;
            User.findById(Id, (err, Finder)=> {
                if(err){
                    res.status(500).send({message: 'Error en Peticion ' });
                }else {
                    if(!Finder){
                        res.status(404).send({ message: 'Cargo No Existe' });
                    }else {
                        Finder.operaciones.push(Update);
                        Finder.save((err, Saved)=>{
                            if(err){
                                res.status(500).send({message: 'Error al Generar el cargo'});
                            }else{
                                if(!Saved){
                                    res.status(404).send({message: 'Nos se ha registrado el cargo'});
                                }else {
                                    res.status(200).send({user: Saved});
                                    }
                            }  
                        });
                    }
                }
            });
    }

    function deleteUserAdminOperaciones(req, res){
         var Id = req.params.id;
         var Update = req.body;
        //  console.log(Update);
            User.findById(Id, (err, Finder)=> {
                if(err){
                    res.status(500).send({message: 'Error en Peticion ' });
                }else {
                    if(!Finder){
                        res.status(404).send({ message: 'Contrato No Existe' });
                    }else {
                        Finder.operaciones.remove(Update);
                        Finder.save((err, Saved)=>{
                            if(err){
                                res.status(500).send({message: 'Error al Generar el cargo'});
                            }else{
                                if(!Saved){
                                    res.status(404).send({message: 'Nos se ha registrado el cargo'});
                                }else {
                                    res.status(200).send({user: Saved});
                                    }
                            }  
                        });
                    }
                }
            });
    }


function updateUserAdminCredencial(req, res){
    var update = req.body;
    var userId = req.params.id;
    User.findByIdAndUpdate(userId, {admin: update}, (err, userUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el Usuario'});
        }else{
            if(!userUpdate){
               res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
            }else{
                res.status(200).send({user: userUpdate});
                }
            }
    });
}

function saveUserCredencial(req, res){
    var credencial = req.body;
    var userId = update._id;
    User.findByIdAndUpdate(userId, {credencial: update}, (err, userUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el Usuario'});
        }else{
            if(!userUpdate){
               res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
            }else{
                res.status(200).send({user: userUpdate});
                }
            }
    });
}

function changePass(req, res){   
    // console.log(req.body);
    var params = req.body;
    var userId = params._id;
    var email = params.email;
    var password = params.password;
    var newpass = params.newpass;
    
    User.findOne({email: email}, (err, user) => {
    
        if(err){
            res.status(500).send({message: 'Error en Peticion'});
        }else{
            if(!user){
               res.status(404).send({message: 'Usuario No Registrado, Verifique sus Email Y Contraseña Actual'}); 
              }else{
                //Comprobamos contraseñas
                bcrypt.compare(password, user.password, (err, check) =>{
                        if(check){
                            bcrypt.hash(newpass, null, null, function(err, hash){
                            newpass = hash;
                            //actualizamos clave 
                                User.findOneAndUpdate({email: email}, {password: newpass}, (err, userUpdatePass)=>{
                                     if(err){
                                         res.status(500).send({message: 'Error al actualizar contraseña de Usuario'});
                                     }else{
                                            if(!userUpdatePass){
                                               res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
                                            }else{
                                                res.status(200).send({user: userUpdatePass});
                                                }
                                            }    
                                });
                              });
                         }else{
                             res.status(404).send({message: 'Usuario No Logeado, Verifique los Datos de Ingreso'});                     
                        }
                });  
            }
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[3];
        
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        // console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

            User.findById(userId, (err, user)=>{
                if(!user){
                    res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
                }else{
                    fs.unlink('backend/uploads/users/'+ user.image,()=>{

                    User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdate)=>{
                        if(!userUpdate){
                            res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
                        }else{
                            res.status(200).send({image: file_name, user: userUpdate});
                            }
                        });
                    });    

                 }
            });

        }else{
            res.status(200).send({message: 'Formato de imagen no valido'});
        }

    }else{
      res.status(200).send({message: 'No hay Imagenes para Guardar'});   
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = 'backend/uploads/users/'+ imageFile;
    fs.exists(path_file, (exists) => {
       if(exists){
           res.sendFile(path.resolve(path_file));
       }else{
           res.status(200).send({message: 'No hay Imagen del Usuario'});
       }
    });
}

function uploadImagePortada(req, res){
    var userId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        // console.log(file_path);
        var file_split = file_path.split('\\');
        var file_name = file_split[3];
        
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        // console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

            User.findById(userId, (err, user)=>{
                if(!user){
                    res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
                }else{
                    fs.unlink('backend/uploads/users/'+ user.portada,()=>{

                    User.findByIdAndUpdate(userId, {portada: file_name}, (err, userUpdate)=>{
                        if(!userUpdate){
                            res.status(404).send({message: 'No se ha podido Actualizar el usuario'}); 
                        }else{
                            res.status(200).send({portada: file_name, user: userUpdate});
                            }
                        });
                    });    

                 }
            });

        }else{
            res.status(200).send({message: 'Formato de imagen no valido'});
        }

    }else{
      res.status(200).send({message: 'No hay Imagenes para Guardar'});   
    }
}

module.exports = {
    prueba,
    getUsers,
    getUserEmail,
    getUserId,
    getUserCompany,
    getUserOperaciones,
    getConteoUsers,
    saveUser,
    registerUser,
    confirmUser,
    deleteUser,
    AdminUpdateUser,
    loginUser,
    uploadImage,
    getImageFile,
    changePass,
    updateUser,
    uploadImagePortada,
    restablecerPassword,
    updateUserAdminCredencial,
    addUserAdminOperaciones,
    deleteUserAdminOperaciones,
    tokenUserAutoservicio 
}