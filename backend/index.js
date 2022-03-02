'use strict'
var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var http = require('http');
// require('./socket-cliente.js');

mongoose.Promise = global.Promise;
//cargar rutas
var app_routes = require('./routes/app_rutes');

app.use(bodyParser.urlencoded({extended: false, limit: '850mb',
        parameterLimit: 1000000,}));
app.use(bodyParser.json({
    limit: '850mb'
}));

//configurar CABECERAS
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas base de controladores
app.use('/',express.static('public', {redirect: false}));
app.use('/api', app_routes);


app.get('*', function(request, response, next) {
    response.sendFile(path.resolve('public/index.html'));
});

var uri ="mongodb://127.0.0.1:27017/DutyFree";

var port = 1165;

app.set('port', (process.env.PORT || port));

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Base de Datos App conectada Correctamente...");
    server.listen(app.get('port'), function(){
        console.log(`API escuchando en puerto ` + port);
    });
});

let server = http.createServer(app);
const connections = new Set();

const io =require('socket.io')(server,{
    cors: {
      origin: "http://localhost:1165",
      methods: ["GET", "POST"]
    },
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
      }
  })
io.on('connection', function(socket){

    connections.add(socket);
    console.log('UsuarioConectado '+ socket.id);
    socket.emit('Prueba', 'estos son los datos');

    socket.on('dataUpNow', payload => {
        console.log('entro socket data')
        console.log(payload)
        // io.to(payload.calleeId).emit('offer', { signalData: payload.signalData, callerId: payload.callerId });
    });

    socket.on('disconnect',()=>{
      console.log('usuario desconectado '+ socket.id);
      io.emit('room_left', { type: 'disconnected', socketId: socket.id })
      connections.delete(socket);
    });
});

app.set('io', io);

module.exports = {
    io
}





