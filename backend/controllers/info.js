'use strict'

var Info = require('../models/info');
var path = require('path');
const { MongoClient } = require('mongodb');

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
    const db = client.db(dbName);
    const ObjectId = require('mongodb').ObjectID;

function registerInfo(req, res){
     var params = req.body;
     var info = new Info({
        info: params,
        created_at: new Date(),
        update_at: new Date()
        
    });

    info.save((err, album)=>{
        if(err){
            res.status(500).send({message: 'Error al Guardar informacion' + err});
        }else{
            if(!album){
                res.status(404).send({message: 'Nos se ha registrado la informacion'});
            }else {
                res.status(200).send({doc:album});
                }
             }  
        });
}

async function agregarInfo(req, res){
    var params = req.body;
    var coll = req.params.tag;
    console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(coll);
       
        const insertResult = await collection.insertMany(params);
        console.log('Inserted documents =>', insertResult);
        res.status(200).send(insertResult);
}

async function getCollections(req, res){
    var params = req.body;
    var coll = req.params.tag;
    console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        // const collection = db.collection(coll);
        let arrayCollections = []
        const collections = await db.listCollections().forEach(element => {
            // console.log(element)    
            arrayCollections.push(element.name)
         });;
       
        res.status(200).send(arrayCollections);
}

async function getDataCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    // console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find().forEach(element => {
            // console.log(element)    
            arrayCollections.push(element)
         });
        // console.log(reg)
        res.status(200).send(arrayCollections);
}

async function getDataCollectionEstado(req, res){
    var estado = req.params.estado;
    var coll = req.params.tag;
    console.log(estado)
    console.log(coll)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find({Estado:estado}).forEach(element => {
            // console.log(element)    
            arrayCollections.push(element)
         });
        // console.log(reg)
        res.status(200).send(arrayCollections);
}

async function getDataCollectionKey(req, res){
    var params = req.body;
    var coll = req.params.tag;
    console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find(params).forEach(element => {
            console.log(element)    
            arrayCollections.push(element)
         });
        // console.log(reg)
        res.status(200).send(arrayCollections);
}

async function getHeadersCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
   
        let reg =  await collection.findOne()

        // console.log(reg)
        res.status(200).send(Object.keys(reg));
}

async function updateDataCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    console.log('console update' + coll)
    console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.findOneAndUpdate({_id : ObjectId(params._id)},{$set:{params}},{ upsert: true }, function(err,doc) {
            if (err) { throw err; }
            else { 
                console.log(doc)
                res.status(200).send(doc); }
          });

        // var reg = await collection.mod({_id:params._id}, params, { returnNewDocument: true })
        
}

async function deleteDataCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    var doc = req.params.doc;
    console.log('console update' + coll)
    console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.findOneAndDelete({_id : ObjectId(doc)}, function(err,doc) {
            if (err) { throw err; }
            else { 
                console.log(doc)
                res.status(200).send(doc); }
          });

        // var reg = await collection.mod({_id:params._id}, params, { returnNewDocument: true })
        
}


async function consultarInfoCategoria(req, res){
        var params = req.body;
        var coll = req.params.tag;
         console.log(params)
        await client.connect();
        console.log('Connected successfully to server');
        const collection = db.collection(coll);
        collection.aggregate([
                    { $group: {
                        _id: "$Descr",
                        Ventas:{$sum:'$Importe'},
                        Unidades:{$sum: '$Cantidad'},
                        Codigo: {$addToSet : "$Clasi"},
                        Cop: {$sum: '$COP'},
                        Detalle: {$addToSet : { 
                            vendedor: "$Nombre_del_vendedor",
                            cod_vend: "$Codi",
                            valor: {$sum: '$COP'},
                            usd:{$sum: '$Importe'},
                            und: {$sum: '$Cantidad'},
                        }},
                        
                    }}
                ]).toArray(function(err, items) {
            res.status(200).send(items);
        });
}

async function consultarInfoFolio(req, res){
    var params = req.body;
    var coll = req.params.tag;
     console.log(params)
    await client.connect();
    console.log('Connected successfully to server');
    const collection = db.collection(coll);
    collection.aggregate([
                { $group: {
                    _id: "$Folio",
                    Usd:{$sum:'$Importe'},
                    Unidades:{$sum: '$Cantidad'},
                    Cop: {$sum: '$COP'},
                    Detalle: { $addToSet : { 
                        producto: "$Descripcion_1",
                        cod_prod: "$Codigo_1",
                        valor: {$sum: '$COP'},
                        usd:{$sum: '$Importe'},
                        und: {$sum: '$Cantidad'},
                    }},
                    Vendedor:{$addToSet : { 
                        name: "$Nombre_del_vendedor",
                        cod_vend: "$Codi",
                        valor: {$sum: '$COP'},
                        usd:{$sum: '$Importe'},
                        und: {$sum: '$Cantidad'},
                    }}
                  
                }}
            ]).toArray(function(err, items) {


        res.status(200).send(items);
    });
}

async function getfacturacionSiigo(req, res){
    var coll = req.params.tag;
    await client.connect();
    console.log('Connected successfully to server');
    const collection = db.collection(coll);

    collection.aggregate([ 
        { $group: {
            _id: "$Folio",
            Usd:{$sum:'$Importe'},
            Unidades:{$sum: '$Cantidad'},
            Cop: {$sum:{$multiply: [ '$COP', "$Cantidad" ]}},
            // Cop: {$sum: '$COP'},
            Detalle: { $addToSet : { 
                description: "$Descripcion_1",
                code: "$Clasi",
                price: {$sum: '$COP'},
                quantity: {$sum: '$Cantidad'},
            }},
        }}
    ]).toArray(function(err, items){
        res.status(200).send(items);
        
});


}




async function getInformeVendedor(req, res){
    var params = req.body;
         console.log(params)
        await client.connect();
        console.log('Connected successfully to server');
        var coll = req.params.tag;
        const collection = db.collection(coll);
        collection.aggregate([
                    { $group: {
                        _id: "$Codi",
                        Ventas:{$sum: '$Importe'},
                        Vendedor: {$addToSet : "$Nombre_del_vend"},
                        Unidades:{$sum: '$Cantidad'},
                        Detalle: {$addToSet : { 
                            categ: "$Descr",
                            cod_categ: "$Clasi",
                            valor: {$sum: '$Importe'},
                            und: {$sum: '$Cantidad'},
                        }},
                        
    
                    }},
                ]).toArray(function(err, items) {
            res.status(200).send(items);
        });
}

function getRegistros(req, res){    
    var update = req.body;
    var Id = req.body._id;
    const options = req.body;
    Info.paginate({}, options ,function(err, finders){
        if(err){
            res.status(500).send({message: 'Error al Buscar Informacion'});
        }else{
            if(!finders){
               res.status(404).send({message: 'No se ha podido Actualizar la Informacion'}); 
            }else{
                res.status(200).send(finders);
                }
            }
    });
}

function updateInfo(req, res){    
    var update = req.body;
    var Id = req.body._id;
    console.log(Id)
    Info.findByIdAndUpdate(Id, update, (err, update)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar la Informacion'});
        }else{
            if(!update){
               res.status(404).send({message: 'No se ha podido Actualizar la Informacion'}); 
            }else{
                res.status(200).send({doc:update});
                }
            }
    });
}

function getInfoDato(req, res){
    var params = req.body;
    var dato =  new RegExp(params.search, "i");
    let string = JSON.stringify("'info." + params.key +"':" +  params.search)
    // JSON.parse
    console.log(string)
    Info.find({"info.Folio":dato})    
            .exec(function(err, finders){
                if(err){
                    console.log(err)
                    res.status(500).send({message: 'Error en Peticion de informacion' });
                }else {
                    if(!finders){
                        res.status(404).send({ message: 'No hay iformacion para mostrar' });
                    }else {
                            res.status(200).send({ doc : finders });
                        }
                    }
                });  
}




module.exports = {
    registerInfo,
    updateInfo,
    getRegistros,
    getInfoDato,
    getInformeVendedor,
    getfacturacionSiigo,
    getDataCollectionEstado,
    agregarInfo,
    consultarInfoCategoria,
    getCollections,
    getDataCollection,
    getHeadersCollection,
    getDataCollectionKey,
    updateDataCollection,
    consultarInfoFolio,
    deleteDataCollection
}




