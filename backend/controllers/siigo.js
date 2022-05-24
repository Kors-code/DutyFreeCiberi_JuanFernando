'use strict'

var path = require('path');
const { MongoClient } = require('mongodb');
var fs = require('fs');
let PDF = require('handlebars-pdf')

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'DutyFree';
    const db = client.db(dbName);
    const ObjectID = require('mongodb').ObjectID;

async function sendInvoiceSiigo1(req, res){
    let io = req.app.get('io');
    //console.log('entro Registro Facturas')
    var params = req.body;
    var coll = req.params.tag;
     //console.log(params)
    var unirest = require('unirest');
    var token;
    var req = unirest('POST', 'https://api.siigo.com/auth')
      .headers({
        'Content-Type': 'application/json'
      })
      .send(JSON.stringify({
        "username": "siigoapi@pruebas.com",
        "access_key": "OWE1OGNkY2QtZGY4ZC00Nzg1LThlZGYtNmExMzUzMmE4Yzc1OjR1NyluZlIlOE4="
      }))
      .end(async function (resp){ 
        if (resp.error) throw new Error(resp.error); 
        token = resp.body.access_token;
        //console.log(token);
        await client.connect();
        //console.log('Connected successfully to server');
        const collection = db.collection(coll);
        collection.aggregate([ {$match: {Estado:'Activa'}},
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
                    var  array = items;
                    var index = 0
                    //console.log('items activos: '+ array.length)
                    if(items.length != 0){
                    const myInterval = setInterval(function () {
                      const element = array[index];
                      //console.log('elemento', element)
                      if(element){
                        element.Detalle.forEach(elemento => {
                          elemento.taxes = [],
                          elemento.code = 'Sku-1'
                      });
                        var req2 = unirest('POST', 'https://api.siigo.com/v1/invoices')
                        .headers({
                          'Content-Type': 'application/json',
                          'Partner-ID': 'TestNat',
                          'Authorization': 'Bearer '+token
                        })
                        .send(JSON.stringify({
                          "document": {
                            "id": 27138
                          },
                          "date": "2021-04-08",
                          "customer": {
                            "person_type": "Person",
                            "id_type": "13",
                            "identification": "222222222",
                            "branch_office": "0",
                            "name": [
                              "xxxxxx",
                              "xxxxxxx"
                            ],
                            "address": {
                              "address": "xxxxx",
                              "city": {
                                "country_code": "Co",
                                "state_code": "11",
                                "city_code": "11001"
                              }
                            },
                            "phones": [
                              {
                                "number": "000000"
                              }
                            ],
                            "contacts": [
                              {
                                "first_name": "xxxxx",
                                "last_name": "xxxxx",
                                "email": "manuel.camacho@contacto.com"
                              }
                            ]
                          },
                          "seller": 629,
                          "items": element.Detalle,
                          "payments": [
                            {
                              "id": "5635",
                              "value": element.Cop, 
                            }
                          ]
                        }))
                        .end(function (respuesta) { 
                            //console.log(respuesta.body)
                            index ++  
                          if (respuesta.error) {
                            io.emit('UpSiigo', {length:array.length, i:index}); 
                            collection.updateMany({Folio:element._id},{$set: {Siigo:respuesta.error}},{ upsert: false })
                            //console.log(respuesta.error)
                          }
                          if(respuesta.body.id){
                            io.emit('UpSiigo', {length:array.length, i:index}); 
                            collection.updateMany({Folio:element._id},{$set: {Siigo:respuesta.body, Estado:respuesta.body.id}},{ upsert: false })
                            //console.log('Respuesta Siigo', respuesta.raw_body);
                            // io.emit('UpSiigo', {length:array.length, i:index}); 
                          }
                          if(index == array.length){ 
                            //console.log('cerro proceso ' +index + ' Registros')
                            clearInterval(myInterval);
                            res.status(200).send('Cerro Proceso Registro Siigo ' +index + ' Registros');
                          }
                          
                        });
                      }
                    }, 4000);
                  }else{
                      res.status(200).send('Sin Documentos para Procesar Siigo');
                  }   
        });
      });
}

async function sendInvoiceSiigo2(req, res){
  let io = req.app.get('io');
  var params = req.body;
  var coll = req.params.tag;

  //  console.log('params '+ params)
  //  console.log(params.user)

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
      if (resp.error){
        console.log(resp.error); 
        res.status(404).send({message: 'Error ' +resp.error }); 
      } else{
        token = resp.body.access_token;
        //console.log(token);
        await client.connect();
        //console.log('Connected successfully to server');
        const collection = db.collection(coll);
  
        collection.aggregate([ {$match: {Estado:'Activa'}},
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
                      items.forEach(element => {
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
                            newF = newF + '02-'+  date.D
                          } 
                          //console.log(newF)
                            element.Detalle.forEach(elemento => {
                            elemento.taxes = [],
                            elemento.code = 'Sku-1'
                        });
                          var req2 = unirest('POST', 'https://api.siigo.com/v1/invoices')
                          .headers({
                            'Content-Type': 'application/json',
                            'Partner-ID': 'TestNat',
                            'Authorization': 'Bearer '+token
                          })
                          .send(JSON.stringify({
                            "document": {
                              "id": 27138
                            },
                            "date": newF,
                            "number": undefined,
                            "customer": {
                              "person_type": "Person",
                              "id_type": "13",
                              "identification": "222222222",
                              "branch_office": "0",
                              "name": [
                                "xxxxxx",
                                "xxxxxxx"
                              ],
                              "address": {
                                "address": "xxxxx",
                                "city": {
                                  "country_code": "Co",
                                  "state_code": "11",
                                  "city_code": "11001"
                                }
                              },
                              "phones": [
                                {
                                  "number": "000000"
                                }
                              ],
                              "contacts": [
                                {
                                  "first_name": "xxxxx",
                                  "last_name": "xxxxx",
                                  "email": "manuel.camacho@contacto.com"
                                }
                              ]
                            },
                            "seller": 629,
                            "items": element.Detalle,
                            "payments": [
                              {
                                "id": "5635",
                                "value": element.Cop, 
                              }
                            ]
                          }))
                          .end(function (respuesta) { 
                              console.log(respuesta.body)
                            if (respuesta.error){
                              index ++  
                              io.emit('UpSiigo', {length:array.length, i:index}); 
                              collection.updateMany({Folio:element._id},{$set: {Siigo:respuesta.body}},{ upsert: false })
                              //console.log(respuesta.error)
                            }
                            if(respuesta.body.id){
                              index ++  
                              io.emit('UpSiigo', {length:array.length, i:index}); 
                              collection.updateMany({Folio:element._id},{$set: {Siigo:respuesta.body, Estado:respuesta.body.id}},{ upsert: false })
                              //console.log('Respuesta Siigo', respuesta.raw_body);
                              let document = {
                                template: `
                                <div style="   
                                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif';
                                    max-width: 500px;  
                                    color: #585858;
                                    font-size:14px;
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
  
                                          <h5> NO SOMOS GRANDES CONTRIBUYENTES <br>
                                            RESPONSABLE DE IVA/NO SOMOS AUTORRETENEDORES <br>
                                            AUTORIZACION NUMERACION DE FACTURACION <br>
                                            18764011034538 FECHA:2021/02/26 HABILITA <br>
                                            DFA014674 A DFA999999 / VIGENCIA 18 MESES <br>
                                          </h5>
                                         
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
                                  cop:element.Cop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                                  trm:element.TRM.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                                  usd:element.Usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
  
                                },
                                path: "../PDF/"+coll+'/' + element._id+".pdf"
                              }
  
                              PDF.create(document)
                              .then(pdfG => {
                                  //console.log(pdfG)
                              })
                              .catch(error => {
                                  console.error(error)      
                              })
                              // io.emit('UpSiigo', {length:array.length, i:index}); 
                            }
                            if(index == array.length){ 
                              //console.log('cerro proceso ' +index + ' Registros')
                              res.status(200).send('Cerro Proceso Registro Siigo ' +index + ' Registros');
                            }
                          });
                        }
                      });
                  }else{
                      res.status(200).send('Sin Documentos para Procesar Siigo');
                  }   
        },err=>{
          //console.log(err)
          res.status(500).send('error '+ err);
        });
      }


    });
}

async function sendInvoiceSiigo(req, res){
  let io = req.app.get('io');
  var params = req.body;
  var coll = req.params.tag;
  await client.connect();
  //console.log('Connected successfully to server');
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
                items.forEach(element => {
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

                                    <h5> NO SOMOS GRANDES CONTRIBUYENTES <br>
                                      RESPONSABLE DE IVA/NO SOMOS AUTORRETENEDORES <br>
                                      AUTORIZACION NUMERACION DE FACTURACION <br>
                                      18764011034538 FECHA:2021/02/26 HABILITA <br>
                                      DFA014674 A DFA999999 / VIGENCIA 18 MESES <br>
                                    </h5>
                                   
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
                  }
                });
            }else{
                res.status(200).send('Sin Documentos para Procesar Siigo');
            }   
  },err=>{
    //console.log(err)
    res.status(500).send('error '+ err);
  });

}

function sendComprobanteSiigo(req, res){
  var unirest = require('unirest');
  var params = req.body;
  // console.log(params)
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
  var params = req.body;

  var context = {
      costo: params.costo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    };

  let document = {
          template: `
          <div style="   
              font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif';
              max-width: 500px;
              text-align: center;    
              font-size: 10px;
              color: #585858;
              background-color: #fff;
              border-radius: 6px;">
              <h3>DUTY FREE PARTNERS COLOMBIA, SAS</h3>
              <h3>AEROPUERTO INTERNACIONAL JOSE MARIA CORDOVA</h3>
              <h3>LOCALES: 23,23A,23B,23C</h3>
              <h3>VEREDA SAJONIA, RIONEGRO ANTIOQUIA</h3>
              <h3>NIT: 901.195.686-7</h3>
              <h4>FOLIO:{{params.Folio}} FECHA:{{params.Fecha}} HORA:{{params.Hora}}</h4>
              <p>_________________________________________</p>
          
   <div style=" 
              font-size: 12px;  
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-around;
              align-items: flex-start;" >

              <table style: width: 100%>
                  <tr>
                      <td>
                      <div  style="text-align: start; margin-right: 30px;" > 
                          <div style="display:flex; flex-wrap: nowrap;">
                              <img  style="   
                                  width: 110px;
                                  margin-right: 5px; margin-top: 50px;" src="{{operacion.img}}">
                              <img  style="   
                                  width: 110px;
                                  margin-right: 5px; margin-top: 50px;" src="{{qr}}">
                          </div>
                          <h4 class="bc-grey-600">{{operacion.titulo}}</h4>
                          <h4> Nit: {{operacion.codigo}}</h4>
                          <p>{{operacion.ciudad}}  {{operacion.direccion}}</p>
                          <p>Tel: {{operacion.telefono}} {{operacion.email}}</p>
                      </div>
                      </td>
                      <td>
                          <div style="text-align: start; border-left-style: solid; border-width: 1px; padding: 10px;" >
                              <h3>{{coti.movimiento}} # {{coti.prefijo}} {{consecutivo}}</h3>
                              <p>Emitida el: {{created_at}} </p>
                              <h5>Cliente: {{cliente.titulo}} NIT:  {{cliente.identificacion}}   </h5>
                              <p>Direcciòn: {{cliente.ciudad}} {{cliente.direccion}} Tel: {{cliente.telefono}}</p>
                              <p>email: {{cliente.email}}</p>
                              {{#each cliente.contactos}}
                                  <p>Contacto: {{capitalizeAll nombre}} </p>
                                  <p>Email: {{email}} </p>
                              {{/each}}
                          </div> 
                      </td>
                  </tr>
                  <tr>
                  <td colspan="2" style="text-align: center;">
                      <h5 style="text-align: center;">{{protocolo}}</h5>
                  </td>
                  </tr>
              </table>

   </div>
      <h1 style="text-align: center;">DETALLE </h1>
       <div style="width: 100%">
           <table style="margin: 0 auto; width: 100% ">
               <tr >
                  <th style="border: 1px solid grey;">Codigo</th> 
                  <th style="border: 1px solid grey;">Descripción</th>
                  <th style="border: 1px solid grey;">Cantidad</th>
                  <th style="border: 1px solid grey;">Val Unidad</th>
               </tr>
          
           {{#each prductos}}
              <tr>
                  <td style="text-align: center; border-bottom: 1px solid grey;">
                      {{ean}}
                  </td>
                  <td style="text-align: center; border-bottom: 1px solid grey;">
                      {{titulo}}
                  </td>
                  <td style="text-align: center; border-bottom: 1px solid grey;">
                      {{unidades_transadas}}
                  </td>
                  <td style="text-align: right; border-bottom: 1px solid grey;">
                      {{ precio_venta}}
                  </td>
              </tr>
           {{/each}}
          </table>     
       </div>
       <div>
       <table style="margin: 0 auto; width: 100% ">
       <tr>
          <td style="text-align: right;  border-bottom: 1px solid grey;"><h3>SUBTOTAL</h3></td>
          <td style="text-align: right; border-bottom: 1px solid grey;"><h3>{{ base_impuesto }}</h3></td>
       </tr>
       <tr>
          <td style="text-align: right; border-bottom: 1px solid grey;"><h3>IMPUESTOS</h3></td>
          <td style="text-align: right; border-bottom: 1px solid grey;"><h3>{{impuestos}}</h3></td>
       </tr>
       <tr>
          <td style="text-align: right; border-bottom: 1px solid grey;"><h3>TOTAL</h3></td>
          <td style="text-align: right; border-bottom: 1px solid grey;"><h3 style="text-align: right;">{{ precio_venta}}</h3></td>
       </tr>
       </table>
       </div>
          <p style="text-align:center">
                  VENTA DE EXPORTACION
              _______________________________________________
              Todos los datos personales recopilados
              no seran distribuidos o utilizados
              con prpositos diferentes a dar
              cumplimiento a regulaciones nacionales
              _______________________________________________
              NO SOMOS GRANDES CONTRIBUYENTES
              RESPONSABLE DE IVA/NO SOMOS AUTORRETENEDORES
              AUTORIZACION NUMERACION DE FACTURACION
              18764011034538 FECHA:2021/02/26 HABILITA
              DFA014674 A DFA999999 / VIGENCIA 18 MESES
              _______________________________________________
              IMPRESO SOFTWARE MACROPRO
              FACTURA DE VENTA POS:DFA032137
              MACROPRO SOFTWARE S.A. DE C.V. ID:MSO0105111G1
              _______________________________________________
              Atendido por:YAMID AGUDELO GIL
              Servicio al cliente:
              +57(317)432-6895
              contactomde@skyfreeshop.org
              www.dutyfreepartners.com
          </p>
           </div>
          
          `,
          context: context,
          path: "./docs-electronicos/"+params.electronica.urlinvoicepdf
      }
  
  PDF.create(document)
      .then(resp => {
          //console.log(resp)
          res.status(200).send({info:'Factura Creada Correctamente'});
      })
      .catch(error => {
          console.error(error)
          res.status(404).send({message: 'No se ha Generado PDF'}); 
          
      })
}

module.exports ={
    authSiigo,
    sendInvoiceSiigo,
    getFacturacionSiigo,
    getComprobantesSiigo,
    sendComprobanteSiigo
}
