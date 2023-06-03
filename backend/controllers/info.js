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

async function agregarConfiguracion(req, res){
    var params = req.body;
    var coll = 'Config';
    //console.log('entro agregr config')
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(coll);
        const insertResult = await collection.insertOne(params);
        //console.log('Inserted documents =>', insertResult);
        res.status(200).send(insertResult);
}

async function getDataConfig(req, res){
    var params = req.body;
    var coll = 'Config';
    let ID = req.params.id;
    //console.log('id', ID)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find({operacion:ID}).forEach(element => {
            arrayCollections.push(element)
         });
        res.status(200).send(arrayCollections);
}

async function updateDataConfiguracion(req, res){
    var params = req.body;
    var coll = 'Config';
   
    //console.log('75 config '+ params._id)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.updateOne({_id:ObjectId(params._id)},{$set:{
            tiendas:params.tiendas,
            siigoUser:params.siigoUser,
            siigoKey:params.siigoKey,
            tags:params.tags, 
            empleados:params.empleados, 
            categorias:params.categorias, 
            inventarios:params.inventarios,
            emailSalida:params.emailSalida,
            passEmailSalida:params.passEmailSalida,
            notificar:params.notificar,
            protocoloFacturacion:params.protocoloFacturacion,
            operacion:params.operacion,
            dataOperacion:params.dataOperacion,
        }},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function updateDataOperacionConfiguracion(req, res){
    var params = req.body;
    var coll = 'Config';
   
    //console.log('75 config '+ params._id)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.updateOne({_id:ObjectId(params._id)},{$set:{
           
            dataOperacion:params.dataOperacion,
        }},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function updateClaveEmpleadoConfiguracion(req, res){
    var params = req.body;
    var coll = 'Config';
    //console.log('75 config '+ params._id)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.updateOne({_id:ObjectId(params._id),"empleados.identificacion":params.identificacion},{$set:{
            "empleados.$.clave": params.clave
           
        }},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function agregarPresupuesto(req, res){
    var params = req.body;
    var coll = 'Presupuestos';
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(coll);
       
        const insertResult = await collection.insertOne(params);
        //console.log('Inserted documents =>', insertResult);
        res.status(200).send(insertResult);
}

async function getDataPresupuesto(req, res){
    var params = req.body;
    var coll = 'Presupuestos';
     var ID = req.params.id
    // //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find({operacion:ID}).forEach(element => {
            arrayCollections.push(element)
         });
        // //console.log(reg)
        res.status(200).send(arrayCollections);
}


async function getDataPresupuestoTag(req, res){
    var params = req.params.tag;
    var coll = 'Presupuestos';
    // //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find({tag:params}).forEach(element => {
            arrayCollections.push(element)
         });
        // //console.log(reg)
        res.status(200).send(arrayCollections);
}

async function updateDataPresupuesto(req, res){
    var params = req.body;
    var coll = 'Presupuestos';
    //console.log('//console update PRES')
    // //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.findOneAndUpdate({_id : ObjectId(params._id)},{$set:{
            tag:params.tag,
            estado:params.estado,
            ventas:params.ventas,
            comisiones:params.comisiones,
            ventas_usd:params.ventas_usd,
            TRM:params.TRM,
            dias:params.dias,
            capacidadVentas:params.capacidadVentas,
            presupuesto_cop:params.presupuesto_cop,
            presupuesto_usd:params.presupuesto_usd,
            presupuesto_dia_cop:params.presupuesto_dia_cop,
            presupuesto_dia_usd:params.presupuesto_dia_usd,
            cumplimiento_cop:params.cumplimiento_cop,
            cumplimiento_usd:params.cumplimiento_usd,
            tiendas:params.tiendas,
            vendedores:params.vendedores,
            categorias:params.categorias,
            capacidadVentasEsperada:params.capacidadVentasEsperada,
            presupuesto_vendedores:params.presupuesto_vendedores,
            operacion:params.operacion
            
        }},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                res.status(200).send(doc); }
          });

        // var reg = await collection.mod({_id:params._id}, params, { returnNewDocument: true })
        
}

async function deleteDataPresupuesto(req, res){
    var params = req.body;
    var coll = 'Presupuestos';
    //console.log('//console delete PRES')
    // //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.deleteOne({_id : ObjectId(params._id)}, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                res.status(200).send(doc); }
          });

        // var reg = await collection.mod({_id:params._id}, params, { returnNewDocument: true })
        
}

async function remplazarInfo(req, res){
    var params = req.body;
    var coll = req.params.tag;
    // //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        // //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collectionDelete = await db.collection(coll).deleteMany();
        const collection = db.collection(coll)
        const insertResult = await collection.insertMany(params);
        res.status(200).send(insertResult);
}

async function agregarInfo(req, res){
    var params = req.body;
    var coll = req.params.tag;
    // //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        // //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(coll);
       
        const insertResult = await collection.insertMany(params);
        // //console.log('Inserted documents =>', insertResult);
        res.status(200).send(insertResult);
}

async function getCollections(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        // const collection = db.collection(coll);
        let arrayCollections = []
        const collections = await db.listCollections().forEach(element => {
            // //console.log(element)    
            arrayCollections.push(element.name)
         });;
       
        res.status(200).send(arrayCollections);
}

async function getCollectionsInventarios(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        // const collection = db.collection(coll);
        let arrayCollections = []
        const collections = await db.listCollections().forEach(element => {
            // //console.log(element)    
            arrayCollections.push(element.name)
         });;
       
        res.status(200).send(arrayCollections);
}

async function renametCollectionsInventarios(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);

        var coll_off = 'off_'+ coll
        db.collection(coll).rename(coll_off, function(err, newColl) {
            return res.status(200).send(coll_off);
        });  
}

async function renametCollectionsDutyFree(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);

        var coll_off = 'off_'+ coll
        db.collection(coll).rename(coll_off, function(err, newColl) {
            return res.status(200).send(coll_off);
        });  
}

async function deleteCollectionsInventarios(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        db.collection(coll).drop(function(err, newColl) {
            if (err) { 
                return res.status(400).send(err);
            }
            else { 
                return res.status(200).send(newColl);
            }
        });  
}

async function getDataCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find().forEach(element => {
            // //console.log(element)    
            arrayCollections.push(element)
         });
        // //console.log(reg)
        res.status(200).send(arrayCollections);
}

async function getDataCollectionPaginate(req, res){
    var params = req.body;
    const page = req.query.page || 0;
    const dataPage = req.query.data || 500;

    //console.log(page)
    //console.log(dataPage)

    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
        await client.connect();
        //console.log('Connected successfully to server paginate');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find()
        .sort({Folio:1})
        .skip(page * dataPage)
        .limit(dataPage)
        .forEach(element => arrayCollections.push(element))
        .then(()=>{
            res.status(200).send(arrayCollections);
        })
        .catch(()=>{
            res.status(500).send({error:'No se tiena la Data'});
        })
        
}

async function getDataCollectionVendedor(req, res){
    var params = req.body;
    var coll = req.params.tag;
    // //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        // //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find({Codi: params.cod}).forEach(element => {
            // //console.log(element)    
            arrayCollections.push(element)
         });
        // //console.log(reg)
        res.status(200).send(arrayCollections);
}

async function getDataCollectionEstado(req, res){
    var estado = req.params.estado;
    var coll = req.params.tag;
    //console.log(estado)
    //console.log(coll)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find({Estado:estado}).forEach(element => {
            // //console.log(element)    
            arrayCollections.push(element)
         });
        // //console.log(reg)
        res.status(200).send(arrayCollections);
}

async function getDataCollectionKey(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find(params).forEach(element => {
            //console.log(element)    
            arrayCollections.push(element)
         });
        // //console.log(reg)
        res.status(200).send(arrayCollections);
}

async function getHeadersCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
   
        let reg =  await collection.findOne()

        // //console.log(reg)
        res.status(200).send(Object.keys(reg));
}

async function updateDataCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log('//console update' + coll)
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.findOneAndUpdate({_id : ObjectId(params._id)},{$set:{params}},{ upsert: true }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                res.status(200).send(doc); }
          });

        // var reg = await collection.mod({_id:params._id}, params, { returnNewDocument: true })
        
}

async function updateDataVendedorCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log('//console update' + coll)
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.findOneAndUpdate({_id : ObjectId(params._id)},{$set:{VENDEDOR: params.VENDEDOR,CODIGO_VENDEDOR :params.CODIGO_VENDEDOR, Costo_de_v:params.Costo_de_v, UNITCOST:params['COSTO DE VENTA'] }},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                res.status(200).send(doc); }
          });

        // var reg = await collection.mod({_id:params._id}, params, { returnNewDocument: true })
        
}

async function deleteDataCollection(req, res){
    var params = req.body;
    var coll = req.params.tag;
    var doc = req.params.doc;
    //console.log('//console update' + coll)
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);

        collection.findOneAndDelete({_id : ObjectId(doc)}, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                res.status(200).send(doc); }
          });

        // var reg = await collection.mod({_id:params._id}, params, { returnNewDocument: true })
        
}


async function consultarInfoCategoria(req, res){
        var params = req.body;
        var coll = req.params.tag;
         //console.log(params)
        await client.connect();
        //console.log('Connected successfully to server');
        const collection = db.collection(coll);
        collection.aggregate([
                    { $group: {
                        _id: '$CLASIFICACION',
                        Ventas:{$sum:'$Importe'},
                        Unidades:{$sum: '$CANTIDAD'},
                        Codigo: {$addToSet : "$CATEGORIA"},
                        Cop: {$sum: '$COP'},
                        Cost: {$sum: {$toInt: "$Costo_de_v"}},
                        Detalle: {$addToSet : { 
                            vendedor: "$VENDEDOR",
                            cod_vend: "$CODIGO_VENDEDOR",
                            valor: {$sum: '$COP'},
                            usd:{$sum: '$Importe'},
                            und: {$sum: '$CANTIDAD'},
                        }},
                        
                    }},{
                        $sort : { Ventas: -1 }
                      }
                ]).toArray(function(err, items) {
                    //console.log(items)
            res.status(200).send(items);
        });
}

async function consultarInfoCategoriaTienda(req, res){
        var params = req.body;
        var coll = req.params.tag;
         //console.log(params)
        await client.connect();
        //console.log('Connected successfully to server');
        const collection = db.collection(coll);
        collection.aggregate([
                    { $group: {
                        _id: {sub:"$CATEGORIA",pv:"$PDV"},
                        Ventas:{$sum:'$Importe'},
                        Unidades:{$sum: '$CANTIDAD'},
                        Codigo: {$addToSet : "$CLASIFICACION"},
                        Cop: {$sum: '$COP'},
                        Cost: {$sum: {$toInt: "$Costo_de_v"}},
                        Detalle: {$addToSet : { 
                            vendedor: "$VENDEDOR",
                            cod_vend: "$CODIGO_VENDEDOR",
                            valor: {$sum: '$COP'},
                            usd:{$sum: '$Importe'},
                            und: {$sum: '$CANTIDAD'},
                        }},
                        
                    }},{
                        $sort : { Ventas: -1 }
                      }
                ]).toArray(function(err, items) {
            res.status(200).send(items);
        });
}

async function consultarInfoFolio(req, res){
    var params = req.body;
    var coll = req.params.tag;
     //console.log(params)
    await client.connect();
    //console.log('Connected successfully to server');
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
    //console.log('Connected successfully to server');
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


async function getInformePresupuesoVendedor(req, res){
    var params = req.body;
         //console.log(params)
         
        await client.connect();
        //console.log('Connected successfully to server');
        var coll = req.params.tag;
        const collection = db.collection(coll);
        collection.aggregate([
                    { $group: {
                        _id: {clasi:"$CLASIFICACION"},
                        Ventas:{$sum: '$Importe'},
                        VentasCop:{$sum: '$COP'},
                        Vendedor:"$VENDEDOR",
                        Unidades:{$sum: '$CANTIDAD'},
                        Cost: {$sum: {$toInt: '$Costo_de_v'}},
                        // Detalle: {$addToSet : { 
                        //     categ: "$Descr",
                        //     cod_categ: "$Clasi",
                        //     valor: '$Importe',
                        //     valorCop: {$sum: '$COP'},
                        //     und: {$sum: '$Cantidad'},
                        // }},
                    }},
                ]).toArray(function(err, items) {
            res.status(200).send(items);
        });
}

async function getInformeVendedor(req, res){
    var params = req.body;
         //console.log(params)
        await client.connect();
        //console.log('Connected successfully to server');
        var coll = req.params.tag;
        const collection = db.collection(coll);
        collection.aggregate([
                    { $group: {
                        _id: "$CODIGO_VENDEDOR",
                        Ventas:{$sum: '$Importe'},
                        VentasCop:{$sum: '$COP'},
                        Vendedor: {$addToSet : "$VENDEDOR"},
                        Unidades:{$sum: '$CANTIDAD'},
                        Cost: {$sum: {$toInt: '$Costo_de_v'}},
                        Detalle: {$addToSet : { 
                            categ: "$CATEGORIA",
                            cod_categ: "$CLASIFICACION",
                            valor: {$sum: '$Importe'},
                            folio:'$FOLIO',
                            valorCop: {$sum: '$COP'},
                            und: {$sum: '$CANTIDAD'},
                        }},
                    }},{
                        $sort : { Ventas: -1 }
                      }
                ]).toArray(function(err, items) {
            res.status(200).send(items);
        });
}

async function getInformeCajeros(req, res){
    var params = req.body;
         //console.log(params)
        await client.connect();
        //console.log('Connected successfully to server');
        var coll = req.params.tag;
        const collection = db.collection(coll);
        collection.aggregate([
                    { $group: {
                        _id: "$CAJERO",
                        Ventas:{$sum: '$Importe'},
                        VentasCop:{$sum: '$COP'},
                        Unidades:{$sum: '$CANTIDAD'},
                        Cost: {$sum: {$toInt: '$Costo_de_v'}},
                        // Cost_usd: {$sum: {$toInt: '$UNITCOST'}},
                        Detalle: {$addToSet : { 
                            categ: "$CATEGORIA",
                            cod_categ: "$CLASIFICACION",
                            valor: {$sum: '$Importe'},
                            folio:'$FOLIO',
                            valorCop: {$sum: '$COP'},
                            und: {$sum: '$CANTIDAD'},
                        }},
                    }},{
                        $sort : { Ventas: -1 }
                      }
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
    //console.log(Id)
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
    //console.log(string)
    Info.find({"info.Folio":dato})    
            .exec(function(err, finders){
                if(err){
                    //console.log(err)
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

// CONTEOS DE INVENTARIO

async function agregarConteo(req, res){
    var params = req.body;
    var coll = req.params.tag;
    // //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
   
        await client.connect();
        // //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(coll);
       
        const insertResult = await collection.insertMany(params);
        // //console.log('Inserted documents =>', insertResult);
        res.status(200).send(insertResult);
}

async function contarEan(req, res){
    var params = req.body;
    var coll = req.params.tag;
    let io = req.app.get('io');
    let scan = params.scan +'';
    //console.log(params.scan)
    //console.log('684  '+ coll)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({EAN:scan},
            {$push:{Conteo0:params}}, function(err,doc) {
            if (err) {
                //console.log(err) 
                throw err; }
            else { 
                //console.log(doc)
                collection.findOne({EAN:scan},
                     function(err,docEAN) {
                        //console.log(doc)
                            //console.log(docEAN)
                            io.emit('scan'+coll, params);
                            client.close();
                            res.status(200).send(docEAN); 
                    })
               
            }
          });        
}

async function contarSKU(req, res){
    var params = req.body;
    var coll = req.params.tag;
    let io = req.app.get('io');
    let scan = params.scan +'';
    //console.log('680  '+ params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({Codigo1:scan},
            {$push:{Conteo0:params}}, function(err,doc) {
            if (err) { throw err; }
            else {
                  collection.findOne({Codigo1:scan},
                     function(err,docEAN) {
                        //console.log(doc)
                            //console.log(docEAN)
                            io.emit('scan'+coll, params);
                            client.close();
                            res.status(200).send(docEAN); 
                    })
            }
          });        
}

async function getConteoTag(req, res){
    var params = req.body;
    var coll = req.params.tag;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find().forEach(element => {
            arrayCollections.push(element)
         });
       
        res.status(200).send(arrayCollections);
}

async function updateDataConteoDefinitivo(req, res){
    var params = req.body;
    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({_id:ObjectId(params._id)},{$set:{Conteo0:params.Conteo0,Definitivo:params.Definitivo,}},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function updateDataConteoDefinitivoDefinitvo(req, res){
    var params = req.body;
    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({_id:ObjectId(params._id)},{$set:{Definitivo:params.Definitivo, Estado:params.Estado, Conteo:params.Conteo, Diferencia:params.Diferencia}},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function updateDataConteoJustificacion(req, res){
    var params = req.body;
    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({_id:ObjectId(params._id)},{$set:{justificacion:params.justificacion,}},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}


async function updateDataConteo1(req, res){
    var params = req.body;
    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({_id:ObjectId(params._id)},{$set:{Conteo0:params.Conteo0, Conteo1:params.Conteo1}},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function updateDataConteo2(req, res){
    var params = req.body;
    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({_id:ObjectId(params._id)},{$set:{Conteo0:params.Conteo0, Conteo2:params.Conteo2}},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function updateDataConteo3(req, res){
    var params = req.body;
    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({_id:ObjectId(params._id)},{$set:{Conteo0:params.Conteo0, Conteo3:params.Conteo3}},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function updateDataConteo4(req, res){
    var params = req.body;
    var coll = req.params.tag;
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFreeInventarios';
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        collection.updateOne({_id:ObjectId(params._id)},{$set:{Conteo0:params.Conteo0, Conteo4:params.Conteo4}},{ upsert: false }, function(err,doc) {
            if (err) { throw err; }
            else { 
                //console.log(doc)
                client.close();
                res.status(200).send(doc); }
          });        
}

async function renameCollectionsDB(req, res){
    var params = req.body;
    //console.log(params)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = params.dataBase;
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        var coll_off = params.collNew 
        var coll = params.collOrigin 
        db.collection(coll).rename(coll_off, function(err, newColl) {
            return res.status(200).send(newColl);
        });  
}

async function getProductoEan(req, res){
    var coll = 'Productos';
    let ID = req.params.id;
    //console.log('id', ID)
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
   
        await client.connect();
        //console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = await db.collection(coll);
        let arrayCollections = []
        var reg = await collection.find({CODIGO:ID}).forEach(element => {
            arrayCollections.push(element)
         });
         if(arrayCollections.length != 0){
            res.status(200).send(arrayCollections);
         }else{
            var reg = await collection.find({UPC1:ID}).forEach(element => {
                arrayCollections.push(element)
             }); 
             if(arrayCollections.length != 0){
                res.status(200).send(arrayCollections);
             }else{
                let dato =  new RegExp( ID, "i");
                let reg = await collection.find({DESCRIPCION: {$regex:dato}}).forEach(element => {
                    arrayCollections.push(element)
                 }); 
                 res.status(200).send(arrayCollections);
             }

         }
        
}


module.exports = {
    registerInfo,
    updateInfo,
    getRegistros,
    getInfoDato,
    getInformeVendedor,
    getInformeCajeros,
    getInformePresupuesoVendedor,
    getfacturacionSiigo,
    getDataCollectionEstado,
    getDataCollectionVendedor,
    getDataCollectionPaginate,
    agregarInfo,
    consultarInfoCategoria,
    consultarInfoCategoriaTienda,
    getCollections,
    getCollectionsInventarios,
    getDataCollection,
    getHeadersCollection,
    getDataCollectionKey,
    updateDataCollection,
    consultarInfoFolio,
    deleteDataCollection,

    agregarPresupuesto,
    getDataPresupuesto,
    getDataPresupuestoTag,
    updateDataPresupuesto,

    agregarConfiguracion,
    getDataConfig,
    updateDataConfiguracion,
    updateDataOperacionConfiguracion,
    updateClaveEmpleadoConfiguracion,
    updateDataVendedorCollection,
    agregarConteo,
    contarEan,
    contarSKU,
    getConteoTag,
    updateDataConteoDefinitivo,
    updateDataConteoDefinitivoDefinitvo,
    updateDataConteoJustificacion,
    updateDataConteo1,
    updateDataConteo2,
    updateDataConteo3,
    updateDataConteo4,
    deleteDataPresupuesto,
    renameCollectionsDB,


    renametCollectionsInventarios,
    deleteCollectionsInventarios,
    remplazarInfo,

    getProductoEan
}




