'use strict'

var jwt = require('jwt-simple');
var secret = 'dutyFree';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Error de Autorizacion'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);
            if(payload.exp <= new Date().getTime()){
                 return res.status(401).send({message: 'token ha Expirado'});
            }
    }catch(ex){
        console.log(ex);
         return res.status(404).send({message: 'token no valido'});
    }

    req.user = payload;

    next();

};



exports.adminAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Error de Autorizacion'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);
        // console.log(payload);
            if( payload.rol != 'Admin' ){
                 return res.status(401).send({message: 'token Admin invalido'});
            }
    }catch(ex){
        // console.log(ex);
         return res.status(404).send({message: 'token Admin no valido'});
    }

    req.user = payload;

    next();

};

exports.devAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Error de Autorizacion'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);
            if( payload.origen != 'Developer' ){
                 return res.status(401).send({message: 'token Dev invalido'});
            }
    }catch(ex){
        // console.log(ex);
         return res.status(404).send({message: 'token Dev no valido'});
    }

    req.user = payload;

    next();

};