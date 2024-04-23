'use strict'

var path = require('path');
const { MongoClient } = require('mongodb');
var fs = require('fs');
let PDF = require('handlebars-pdf');
const { param } = require('../routes/app_rutes');

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
    const db = client.db(dbName);
    const ObjectID = require('mongodb').ObjectID;


async function sendInvoiceSiigo(req, res){
  let io = req.app.get('io');
  var params = req.body;
  var coll = req.params.tag;
  await client.connect();
  console.log('Connected successfully to server');
  const collection = db.collection(coll);

  collection.aggregate([ {$match: {Estado:'Siigo'}},
              { $group: {
                  _id: "$Folio",
                  Usd:{$sum:'$Importe'},
                  Unidades:{$sum: '$Cantidad'},
                  Cop: {$sum: '$COP'},
                  Hora: {$addToSet: '$Hora'},
                  _Fecha: {$addToSet: '$Fecha'},
                  TRM: {$addToSet: '$TRM'},
                  Vendedor:{$addToSet: '$Nombre_del_vend'},
                  Costumer:{$addToSet: '$Costumer'},
                  Fecha: {$addToSet:{
                      D:'$Day',
                      M:'$Month',
                      Y:'$Year'
                  }},
                  Detalle: { $addToSet : { 
                      description: "$Detalle",
                      code: "$Clasi",
                      price: {$sum:{$divide: [ '$COP', "$Cantidad" ]}},
                      quantity: {$sum: '$Cantidad'},
                      importe: {$sum: '$Importe'},
                  }},
              }}
          ]).toArray(function(err, items){
              var  array = items;
              var index = 0
              //console.log('items activos: '+ items.length)
              if(array.length != 0){
                // items.forEach(element => {
                  for (let index = 0; index < array.length; index++) {
                    const element = array[index];
               
                  console.log(element)
                  const date = element.Fecha[0]
                  let folio = element._id.slice(4)
                  console.log(folio)     
                  var newF = '';     
                  if(element){
                     newF = newF + date.Y +'-'
                    let mes =  date.M   
                    if(mes == 'ENE'){
                      newF = newF + '01-'+  date.D
                    }      
                    if(mes == 'FEB'){
                      newF = newF + '02-'+  date.D
                    } 
                    if(mes == 'MAR'){
                      newF = newF + '03-'+  date.D
                    }
                    if(mes == 'ABR'){
                      newF = newF + '04-'+  date.D
                    }  
                    if(mes == 'MAY'){
                      newF = newF + '05-'+  date.D
                    } 
                    if(mes == 'JUN'){
                      newF = newF + '06-'+  date.D
                    } 
                    if(mes == 'JUL'){
                      newF = newF + '07-'+  date.D
                    } 
                    if(mes == 'AGO'){
                      newF = newF + '08-'+  date.D
                    }
                    if(mes == 'SEP'){
                      newF = newF + '09-'+  date.D
                    } 
                    if(mes == 'OCT'){
                      newF = newF + '10-'+  date.D
                    } 
                    if(mes == 'NOV'){
                      newF = newF + '11-'+  date.D
                    } 
                    if(mes == 'DIC'){
                      newF = newF + '12-'+  date.D
                    }  
                    //console.log(newF)
                      element.Detalle.forEach(elemento => {
                      elemento.taxes = [],
                      elemento.code = 'Sku-1'
                  });
                        //console.log('Respuesta Siigo', respuesta.raw_body);
                        let document = {
                          template: `
                          <div style="   
                              font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif';
                              max-width: 800px;  
                              color: #585858;
                              font-size:16px;
                              background-color: #fff;
                              border-radius: 6px;"
                              margin: 0 auto>
                                <h4>DUTY FREE PARTNERS COLOMBIA, SAS <br>
                                  AEROPUERTO INTERNACIONAL JOSE MARIA CORDOVA <br>
                                  LOCALES: 23,23A,23B,23C <br>
                                  VEREDA SAJONIA, RIONEGRO ANTIOQUIA <br>
                                  NIT: 901.195.686-7 <br>
                                  FOLIO:{{folio}} FECHA:{{fecha}} HORA:{{hora}} <br>
                                  _______________________________________________ 
                                </h4>
                                <table style="max-width: 500px; font-size:0.9em;">
                                  <tr>
                                    <th> Unds </th>
                                    <th> Descripcion </th>
                                    <th> Total</th>
                                  </tr>
                                  {{#each products}}
                                  <tr>
                                    <td style="text-align: center; border-bottom: 1px solid grey;">
                                        {{quantity}}
                                    </td>
                                      <td style="text-align: center; border-bottom: 1px solid grey;">
                                          {{description}}
                                      </td>
                              
                                      <td style="text-align: right; border-bottom: 1px solid grey;">
                                          {{ importe }}
                                      </td>
                                  </tr>
                               {{/each}}
                                
                                </table>
                                <h3>
                                    TRM USD:$ {{trm}} TOTAL DLL: $ {{usd}}  <br>
                                    TOTAL COP: $ {{cop}} <br>                                   
                                </h3>
                                {{#each costumer}}
                                    <div style="text-align:left;max-width: 500px; margin:0 auto; ">
                                    _______________________________________________  <br>
                                      PAX INFO <br>
                                      Nombre: {{NOMBRE_DE_PAX}} <br>
                                      Origen: {{ORIGEN}} <br>
                                      Destino: {{DESTIN}} <br>
                                      Aerolinea: {{AEROLINEA}} <br>
                                      Vuelo: {{VUELO}} <br>
                                      Asiento:{{ASIENT}} <br>
                                      Passport: {{PASAPORTE}} Pais: {{costumer.NACION}} <br>
                                      STEB Bag: {{STEB_BAG}} <br>
                                      _______________________________________________ 
                                    </div>
                                {{/each}}
                                <p>
                                    "VENTA DE EXPORTACION" <br>
                                    _______________________________________________ 
                                </p>
                                
                                <p> Todos los datos personales recopilados <br>
                                    no seran distribuidos o utilizados <br>
                                    con prpositos diferentes a dar <br>
                                    cumplimiento a regulaciones nacionales <br>
                                    _______________________________________________ 
                                </p>

                                    <h5> {{resolucion}} </h5>
                                   
                                    <p> _______________________________________________</p>
                                    <h5>IMPRESO SOFTWARE MACROPRO <br>
                                        FACTURA DE VENTA POS:{{folio}} <br>
                                        MACROPRO SOFTWARE S.A. DE C.V. ID:MSO0105111G1 <br>
                                    </h5>
                                <p> 
                                    _______________________________________________ <br>
                                    Atendido por:{{vendedor}} <br>
                                    Servicio al cliente: <br>
                                    +57(317)432-6895 <br>
                                    contactomde@skyfreeshop.org <br>
                                    www.dutyfreepartners.com <br>
                                </p>
                           </div>
                          `,
                          context: {
                            folio: element._id,
                            fecha: element._Fecha,
                            hora: element.Hora,
                            products:element.Detalle,
                            vendedor: element.Vendedor,
                            costumer: element.Costumer,
                            resolucion: element.Resolucion,
                            cop:element.Cop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                            trm:element.TRM.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                            usd:element.Usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),

                          },
                          path: "../PDF/"+coll+'/' + element._id+".pdf"
                        }
              
                        PDF.create(document)
                        .then(pdfG => {
                          index ++  
                          collection.updateMany({Folio:element._id},{$set: {Pdf:pdfG, Estado:'PDF'}},{ upsert: false })
                          io.emit('UpSiigo', {length:array.length, i:index}); 
                            console.log(pdfG)
                            
                        })
                        .catch(error => {
                            console.error(error)      
                        })    
                        // break          
                  }
                };
            }else{
                res.status(200).send('Sin Documentos para Procesar Siigo');
            }   
  },err=>{
    //console.log(err)
    res.status(500).send('error '+ err);
  });

}

async function sendComprobanteSiigo(req, res){
  var unirest = require('unirest');
  var params = req.body;
  // console.log(params)

  await client.connect();
  const db = client.db(dbName);
  const collection = await db.collection('Config');

  let Consecutivo = 0;
  // console.log(collection)

  if(params.iddoc == 5086){
    let confi = await collection.findOneAndUpdate({operacion:params._id},
      { $inc: {consecutivoCompCosto: 1 }},
      { upsert: false }, function(err,doc) {
          if (err) { throw err; }
          else { 
              console.log('doc 1', doc.value.consecutivoCompCosto)

              Consecutivo = doc.value.consecutivoCompCosto

                var token;
                  var req = unirest('POST', 'https://api.siigo.com/auth')
                    .headers({
                      'Content-Type': 'application/json'
                    })
                    .send(JSON.stringify({
                      "username": params.user,
                      "access_key": params.key
                    }))
                    .end(async function (resp){ 
                      if (resp.error) throw new Error(resp.error); 
                      token = resp.body.access_token;

                      var req2 = unirest('POST', 'https://api.siigo.com/v1/journals')
                      .headers({
                        'Content-Type': 'application/json',
                        'Partner-ID': 'TestNat',
                        'Authorization': 'Bearer '+ token
                      })
                      .send(JSON.stringify({
                        document: {
                          id: params.iddoc
                        },
                        date: params.date,
                        items:params.data,
                        observations: params.obs
                      }))
                      .end(function (respu) { 
                        // console.log(respu)
                        if (respu.error){
                          res.status(400).send({message: 'Error ' +respu.raw_body }); 
                        }else{
                          res.status(200).send(respu.body)
                        }
                       
                      });
                    
                    })


              console.log('consecutivo', Consecutivo)
              client.close();
          }
              
        });
  }

  if(params.iddoc == 31800){
    let confi = await
    collection.findOneAndUpdate({operacion:params._id},
      { $inc: {consecutivoCompVenta: 1 }},
      { upsert: false }, function(err,doc) {
          if (err) { throw err; }
          else { 
              // console.log('doc', doc)
              Consecutivo = doc.value.consecutivoCompVenta
              var token;
                  var req = unirest('POST', 'https://api.siigo.com/auth')
                    .headers({
                      'Content-Type': 'application/json'
                    })
                    .send(JSON.stringify({
                      "username": params.user,
                      "access_key": params.key
                    }))
                    .end(async function (resp){ 
                      if (resp.error) throw new Error(resp.error); 
                      token = resp.body.access_token;

                      var req2 = unirest('POST', 'https://api.siigo.com/v1/journals')
                      .headers({
                        'Content-Type': 'application/json',
                        'Partner-ID': 'TestNat',
                        'Authorization': 'Bearer '+ token
                      })
                      .send(JSON.stringify({
                        document: {
                          id: params.iddoc
                        },
                        date: params.date,
                        items:params.data,
                        observations: params.obs
                      }))
                      .end(function (respu) { 
                        // console.log(respu)
                        if (respu.error){
                          // console.log(respu.error)

                          res.status(400).send({message: 'Error ' +respu.raw_body }); 
                        }else{
                          res.status(200).send(respu.body)
                        }
                        console.log(respu.raw_body);
                      });
                    
                    })

                    client.close();
          }
              
        });
  }
  console.log('comprobante de caja', params.iddoc)
  if(params.iddoc == 34002){
    console.log('comprobante de caja envio')
    let confi = await collection.findOneAndUpdate({operacion:params._id},
      { $inc: {consecutivoCompCaja: 1 }},
      { upsert: false }, function(err,doc) {
          if (err) { throw err; }
          else { 
              console.log('items', params.data.length);
              console.log('id doc', params.iddoc);
              console.log('date', params.date);
              console.log('obs', params.obs);

              Consecutivo = doc.value.consecutivoCompCosto
                var token;
                  var req = unirest('POST', 'https://api.siigo.com/auth')
                    .headers({
                      'Content-Type': 'application/json'
                    })
                    .send(JSON.stringify({
                      "username": params.user,
                      "access_key": params.key
                    }))
                    .end(async function (resp){ 
                      if (resp.error) {throw new Error(resp.error)
                      console.log(resp.error)}; 
                      token = resp.body.access_token;
                      var req2 = unirest('POST', 'https://api.siigo.com/v1/journals')
                      .headers({
                        'Content-Type': 'application/json',
                        'Partner-ID': 'TestNat',
                        'Authorization': 'Bearer '+ token
                      })
                      .send(JSON.stringify({
                        document: {
                          id: params.iddoc
                        },
                        date: params.date,
                        items:params.data,
                        observations: params.obs
                      }))
                      .end(function (respu) { 
                        // console.log(respu)
                        if (respu.error){
                          res.status(400).send({message: 'Error ' +respu.raw_body }); 
                        }else{
                          res.status(200).send(respu.body)
                        }
                       
                      });
                    })
              // console.log('consecutivo', Consecutivo)
              client.close();
          }     
        });
  }

}


async function agregarInfoComprobante(req, res){
  var coll = 'ComprobantesSiigo';
  var params = req.body;
  console.log('REGISTRO')
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);
  const dbName = 'DutyFree';
 
      await client.connect();
  
      const db = client.db(dbName);
      const collection = db.collection(coll);
      const insertResult = await collection.insertOne(params);
      res.status(200).send(insertResult);

}

async function getComprobantes(req, res){
  var coll = 'ComprobantesSiigo';

 // //console.log(params)
 const url = 'mongodb://localhost:27017';
 const client = new MongoClient(url);
 const dbName = 'DutyFree';

     await client.connect();
     //console.log('Connected successfully to server');
     const db = client.db(dbName);
     const collection = await db.collection(coll);
     let arrayCollections = []
     var reg = await collection.find({}).forEach(element => {
         arrayCollections.push(element)
      });
  
     res.status(200).send(arrayCollections);
}


function getListadoSiigo(req, res){
  var pg = req.params.tag;
  var params = req.body;
  var unirest = require('unirest');
  var token;
  var req = unirest('POST', 'https://api.siigo.com/auth')
    .headers({
      'Content-Type': 'application/json'
    })
    .send(JSON.stringify({
      "username": params.user,
      "access_key": params.key
    }))
    .end(async function (resp){ 
      if (resp.error) console.log(resp.error); 
      token = resp.body.access_token;

      var req2 = unirest('GET', 'https://api.siigo.com/v1/'+pg)
      .headers({
        'Authorization': 'Bearer ' + token,
        'Partner-Id':'DutyFree'
      })
      .send("")
      .end(function (respu) { 
        if (resp.error){
          //console.log(resp.error)
          res.status(404).send({message: 'Error ' +resp.error }); 
        }  
        //console.log(res.raw_body);
        res.status(200).send(respu.body)
       
      });
    
    })





  

}

function getFacturacionSiigo(req, res){
  var pg = req.params.tag;
  var unirest = require('unirest');
  var params = req.body;
  console.log(params)
  var token;
  var req = unirest('POST', 'https://api.siigo.com/auth')
    .headers({
      'Content-Type': 'application/json'
    })
    .send(JSON.stringify({
      "username": params.user,
      "access_key": params.key
    }))
    .end(async function (resp){ 
      if (resp.error) console.log(resp.error); 
      token = resp.body.access_token;

      var req2 = unirest('GET', 'https://api.siigo.com/v1/invoices?page='+pg)
      .headers({
        'Authorization': 'Bearer ' + token
      })
      .send("")
      .end(function (respu) { 
        if (resp.error){
          //console.log(resp.error)
          res.status(404).send({message: 'Error ' +resp.error }); 
        }  
        //console.log(res.raw_body);
        res.status(200).send(respu.body)
       
      });
    
    })





  

}

function getComprobantesSiigo(req, res){
  var pg = req.params.tag;
  var unirest = require('unirest');
  var params = req.body;
  console.log(params)
  var token;
  var req = unirest('POST', 'https://api.siigo.com/auth')
    .headers({
      'Content-Type': 'application/json'
    })
    .send(JSON.stringify({
      "username": params.user,
      "access_key": params.key
    }))
    .end(async function (resp){ 
      if (resp.error) console.log(resp.error); 
      token = resp.body.access_token;

      var req2 = unirest('GET', 'https://api.siigo.com/v1/journals?page='+pg)
      .headers({
        'Authorization': 'Bearer ' + token
      })
      .send("")
      .end(function (respu) { 
        if (resp.error){
          //console.log(resp.error)
          res.status(404).send({message: 'Error ' +resp.error }); 
        }  
        //console.log(res.raw_body);
        res.status(200).send(respu.body)
       
      });
    
    })





  

}

function authSiigo (req, res){
    //console.log('entro siigo')
    var unirest = require('unirest');
    var req = unirest('POST', 'https://siigonube.siigo.com:50050/connect/token')
    .headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic U2lpZ29XZWI6QUJBMDhCNkEtQjU2Qy00MEE1LTkwQ0YtN0MxRTU0ODkxQjYx',
        'Accept': 'application/json'
    })
    .send('grant_type=password')
    .send('username=siigoapi@pruebas.com')
    .send('password=9999')
    .send('scope=WebApi offline_access')
    .end(function (resp) { 
        if (res.error) throw new Error(res.error); 
        //console.log(res.raw_body);
       res.status(200).send(resp);
    });
}

async function PdfFactura(req, res){
  let io = req.app.get('io');
  var params = req.body;
  var coll = req.params.tag;
  await client.connect();
  const collection = db.collection(coll);
  collection.aggregate([ {$match: {Folio:params.Folio}},
              { $group: {
                  _id: "$Folio",
                  Usd:{$sum:'$Importe'},
                  Unidades:{$sum: '$Cantidad'},
                  Cop: {$sum: '$COP'},
                  Hora: {$addToSet: '$Hora'},
                  _Fecha: {$addToSet: '$Fecha'},
                  TRM: {$addToSet: '$TRM'},
                  Vendedor:{$addToSet: '$Nombre_del_vend'},
                  Costumer:{$addToSet: '$Costumer'},
                  Resolucion:{$addToSet: '$Resolucion'},
                  Fecha: {$addToSet:{
                      D:'$Day',
                      M:'$Month',
                      Y:'$Year'
                  }},
                  Detalle: { $addToSet : { 
                      description: "$Detalle",
                      code: "$Clasi",
                      price: {$sum:{$divide: [ '$COP', "$Cantidad" ]}},
                      quantity: {$sum: '$Cantidad'},
                      importe: {$sum: '$Importe'},
                  }},
              }}
          ]).toArray(function(err, items){
              var  array = items;
              var index = 0
              //console.log('items activos: '+ items.length)
              if(array.length != 0){
                // items.forEach(element => {
                  for (let index = 0; index < array.length; index++) {
                    const element = array[index];
               
                  // console.log(element)
                  const date = element.Fecha[0]
                  let folio = element._id.slice(4)
                  console.log(folio)     
                  var newF = '';     
                  if(element){
                     newF = newF + date.Y +'-'
                    let mes =  date.M   
                    if(mes == 'ENE'){
                      newF = newF + '01-'+  date.D
                    }      
                    if(mes == 'FEB'){
                      newF = newF + '02-'+  date.D
                    } 
                    if(mes == 'MAR'){
                      newF = newF + '03-'+  date.D
                    }
                    if(mes == 'ABR'){
                      newF = newF + '04-'+  date.D
                    }  
                    if(mes == 'MAY'){
                      newF = newF + '05-'+  date.D
                    } 
                    if(mes == 'JUN'){
                      newF = newF + '06-'+  date.D
                    } 
                    if(mes == 'JUL'){
                      newF = newF + '07-'+  date.D
                    } 
                    if(mes == 'AGO'){
                      newF = newF + '08-'+  date.D
                    }
                    if(mes == 'SEP'){
                      newF = newF + '09-'+  date.D
                    } 
                    if(mes == 'OCT'){
                      newF = newF + '10-'+  date.D
                    } 
                    if(mes == 'NOV'){
                      newF = newF + '11-'+  date.D
                    } 
                    if(mes == 'DIC'){
                      newF = newF + '12-'+  date.D
                    }  
                    //console.log(newF)
                      element.Detalle.forEach(elemento => {
                      elemento.taxes = [],
                      elemento.code = 'Sku-1'
                  });
                        //console.log('Respuesta Siigo', respuesta.raw_body);
                        let document = {
                          template: `
                          <div style="   
                              font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif';
                              width: 100%;  
                              color: #585858;
                              font-size:16px;
                              background-color: #fff;
                              border-radius: 6px;"
                              margin: 0 auto>
                                <h4>DUTY FREE PARTNERS COLOMBIA, SAS <br>
                                  AEROPUERTO INTERNACIONAL JOSE MARIA CORDOVA <br>
                                  LOCALES: 23,23A,23B,23C <br>
                                  VEREDA SAJONIA, RIONEGRO ANTIOQUIA <br>
                                  NIT: 901.195.686-7 <br>
                                  FOLIO:{{folio}} FECHA:{{fecha}} HORA:{{hora}} <br>
                                  _______________________________________________ 
                                </h4>
                                <table style="width: 600px;">
                                  <tr>
                                    <th> Unds </th>
                                    <th> Descripcion </th>
                                    <th> Total</th>
                                  </tr>
                                  {{#each products}}
                                  <tr>
                                    <td style="text-align: center; border-bottom: 1px solid grey;">
                                        {{quantity}}
                                    </td>
                                      <td style="text-align: center; border-bottom: 1px solid grey;">
                                          {{description}}
                                      </td>
                              
                                      <td style="text-align: right; border-bottom: 1px solid grey;">
                                          {{ importe }}
                                      </td>import { Consecutivo } from 'src/app/models/consecutivo';

                                  </tr>
                               {{/each}}
                                
                                </table>
                                <h3>
                                    TRM USD:$ {{trm}} TOTAL DLL: $ {{usd}}  <br>
                                    TOTAL COP: $ {{cop}} <br>                                   
                                </h3>
                                {{#each costumer}}
                                    <div style="text-align:left;max-width: 500px; margin:0 auto; ">
                                    _______________________________________________  <br>
                                      PAX INFO <br>
                                      Nombre: {{NOMBRE_DE_PAX}} <br>
                                      Origen: {{ORIGEN}} <br>
                                      Destino: {{DESTIN}} <br>
                                      Aerolinea: {{AEROLINEA}} <br>
                                      Vuelo: {{VUELO}} <br>
                                      Asiento:{{ASIENT}} <br>
                                      Passport: {{PASAPORTE}} Pais: {{costumer.NACION}} <br>
                                      STEB Bag: {{STEB_BAG}} <br>
                                      _______________________________________________ 
                                    </div>
                                {{/each}}
                                <p>
                                    "VENTA DE EXPORTACION" <br>
                                    _______________________________________________ 
                                </p>
                                
                                <p> Todos los datos personales recopilados <br>
                                    no seran distribuidos o utilizados <br>
                                    con prpositos diferentes a dar <br>
                                    cumplimiento a regulaciones nacionales <br>
                                    _______________________________________________ 
                                </p>

                                    <h5> {{resolucion}}</h5>
                                   
                                    <p> _______________________________________________</p>
                                    <h5>IMPRESO SOFTWARE MACROPRO <br>
                                        FACTURA DE VENTA POS:{{folio}} <br>
                                        MACROPRO SOFTWARE S.A. DE C.V. ID:MSO0105111G1 <br>
                                    </h5>
                                <p> 
                                    _______________________________________________ <br>
                                    Atendido por:{{vendedor}} <br>
                                    Servicio al cliente: <br>
                                    +57(317)432-6895 <br>
                                    contactomde@skyfreeshop.org <br>
                                    www.dutyfreepartners.com <br>
                                </p>
                           </div>
                          `,
                          context: {
                            folio: element._id,
                            fecha: element._Fecha,
                            hora: element.Hora,
                            products:element.Detalle,
                            vendedor: element.Vendedor,
                            costumer: element.Costumer,
                            resolucion: element.Resolucion,
                            cop:element.Cop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                            trm:element.TRM.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                            usd:element.Usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),

                          },
                          path: "../PDF/"+coll+'/' + element._id+".pdf"
                        }
              
                        PDF.create(document)
                        .then(pdfG => {
                          index ++  
                          collection.updateMany({Folio:element._id},{$set: {Pdf:pdfG, Estado:'PDF'}},{ upsert: false })
                          res.status(200).send(pdfG);
                            // console.log(pdfG)
                            
                        })
                        .catch(error => {
                            console.error(error)      
                        })           
                  }
                };
            }else{
                res.status(200).send('Sin Documentos para Procesar Siigo');
            }   
  },err=>{
    //console.log(err)
    res.status(500).send('error '+ err);
  });

}

module.exports ={
    authSiigo,
    sendInvoiceSiigo,
    getFacturacionSiigo,
    getComprobantesSiigo,
    sendComprobanteSiigo,
    PdfFactura,
    getListadoSiigo,
    agregarInfoComprobante,
    getComprobantes
}
