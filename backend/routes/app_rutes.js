'use strict'


var express = require('express');
var UserController = require('../controllers/users');
var infoController = require('../controllers/info');
var siigoController = require('../controllers/siigo');
var OperacionController = require('../controllers/operacion');
var ElectronicaController = require('../controllers/electronica');
var ConsecutivoController = require('../controllers/consecutivo');
var NotasVentaController = require('../controllers/notaVenta');

var api = express.Router();
var md_auth = require('../middelwares/authenticated');

var multipart = require('connect-multiparty');
var md_unpload = multipart({uploadDir:'backend/uploads/users'});

api.get('/users', UserController.getUsers);
api.get('/users-count', UserController.getConteoUsers);
api.get('/prueba-user', UserController.prueba);
api.get('/users-company/:id',md_auth.ensureAuth, UserController.getUserCompany);
api.get('/users-operaciones/:id',md_auth.ensureAuth, UserController.getUserOperaciones);
api.get('/userId/:id',md_auth.ensureAuth, UserController.getUserId);
api.get('/user-email/:id', UserController.getUserEmail);
api.post('/save-user', UserController.saveUser);
api.post('/register-user', UserController.registerUser);
api.post('/confirm-user/:id', UserController.confirmUser);


api.delete('/user-delete/:id',md_auth.ensureAuth, UserController.deleteUser);
api.post('/login', UserController.loginUser);
api.post('/token-autoservicio', UserController.tokenUserAutoservicio);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.put('/admin-update-user/:id', md_auth.ensureAuth, UserController.AdminUpdateUser);
api.put('/confirm-user/:id', UserController.updateUser);

api.post('/upload-image-user/:id', md_unpload, UserController.uploadImage);

api.post('/upload-image-portada/:id', [md_auth.ensureAuth, md_unpload], UserController.uploadImagePortada);
// api.put('/edit-user/:id', md_auth.ensureAuth, UserController.editUser);
api.put('/change-pass', md_auth.ensureAuth, UserController.changePass);

api.put('/restablecer-password/:id', UserController.restablecerPassword);

api.post('/add-user-admin-operacion/:id',md_auth.ensureAuth, UserController.addUserAdminOperaciones);
api.post('/delete-user-admin-operacion/:id',md_auth.ensureAuth,  UserController.deleteUserAdminOperaciones);

api.put('/update-user-admin-credencial/:id',  md_auth.ensureAuth, UserController.updateUserAdminCredencial);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_unpload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);


// INFO RUTAS
api.post('/info',md_auth.ensureAuth,  infoController.registerInfo);
api.post('/info-lote/:tag',md_auth.ensureAuth,  infoController.agregarInfo);
api.post('/replace-info-lote/:tag',md_auth.ensureAuth,  infoController.remplazarInfo);
api.post('/info-paginate',md_auth.ensureAuth, infoController.getRegistros);
api.put('/update-info',  md_auth.ensureAuth, infoController.updateInfo);
api.post('/info-search',md_auth.ensureAuth, infoController.getInfoDato);
api.get('/info-vendedor/:tag',md_auth.ensureAuth, infoController.getInformeVendedor);
api.get('/info-cajeros/:tag',md_auth.ensureAuth, infoController.getInformeCajeros);

api.get('/info-vendedor-ppto/:tag',md_auth.ensureAuth, infoController.getInformePresupuesoVendedor);
api.get('/info-collections',md_auth.ensureAuth, infoController.getCollections);
api.get('/collections-inv',md_auth.ensureAuth, infoController.getCollectionsInventarios);
api.get('/data-collections/:tag',md_auth.ensureAuth, infoController.getDataCollection);
api.get('/data-collections-paginate/:tag',md_auth.ensureAuth, infoController.getDataCollectionPaginate);
api.get('/headers-collections/:tag',md_auth.ensureAuth, infoController.getHeadersCollection);
api.post('/key-collections/:tag',md_auth.ensureAuth, infoController.getDataCollectionKey);
api.post('/update-document/:tag',md_auth.ensureAuth, infoController.updateDataCollection);
api.post('/update-document-vendedor/:tag',md_auth.ensureAuth, infoController.updateDataVendedorCollection);
// api.get('/info-categrias',md_auth.ensureAuth, infoController.getInformeCategoria);
api.get('/info-categrias/:tag',md_auth.ensureAuth, infoController.consultarInfoCategoria);
api.get('/info-categrias-tienda/:tag',md_auth.ensureAuth, infoController.consultarInfoCategoriaTienda);
api.get('/info-folio/:tag',md_auth.ensureAuth, infoController.consultarInfoFolio);
api.get('/info-collection-estado/:tag/:estado',md_auth.ensureAuth, infoController.getDataCollectionEstado);
api.get('/facturacion-siigo/:tag',md_auth.ensureAuth, infoController.getfacturacionSiigo);

api.post('/cumplimiento-vendedor/:tag', infoController.getDataCollectionVendedor);
api.delete('/info/:tag/:doc',md_auth.ensureAuth, infoController.deleteDataCollection);

// SIIGO RUTAS
api.post('/pdf-folio/:tag', md_auth.ensureAuth,  siigoController.PdfFactura);
api.post('/auth-siigo', md_auth.ensureAuth,  siigoController.authSiigo);
api.post('/up-invoice/:tag',md_auth.ensureAuth, siigoController.sendInvoiceSiigo);
api.post('/invoice-siigo/:tag',md_auth.ensureAuth, siigoController.getFacturacionSiigo);
api.post('/journals-siigo/:tag',md_auth.ensureAuth, siigoController.getComprobantesSiigo);
api.post('/journals',md_auth.ensureAuth, siigoController.sendComprobanteSiigo);

// PRESUPUESTOS
api.post('/presupuesto', md_auth.ensureAuth,  infoController.agregarPresupuesto);
api.get('/presupuestos/:id', md_auth.ensureAuth,  infoController.getDataPresupuesto);
api.get('/presupuestos-tag/:tag', md_auth.ensureAuth,  infoController.getDataPresupuestoTag);
api.post('/presupuesto-delete', md_auth.ensureAuth,  infoController.deleteDataPresupuesto);
api.put('/presupuesto', md_auth.ensureAuth,  infoController.updateDataPresupuesto);


// CONFIGURACION
api.post('/configuracion', md_auth.ensureAuth,  infoController.agregarConfiguracion);
api.get('/configuracion/:id', md_auth.ensureAuth,  infoController.getDataConfig);

api.put('/configuracion', md_auth.ensureAuth,  infoController.updateDataConfiguracion);
api.put('/config-clave-empleado', md_auth.ensureAuth,  infoController.updateClaveEmpleadoConfiguracion);
api.put('/config-trm', md_auth.ensureAuth,  infoController.updateDataOperacionConfiguracion);


// INVENTARIOS 

api.post('/master-conteo/:tag', md_auth.ensureAuth,  infoController.agregarConteo);
api.post('/update-conteo-1/:tag', md_auth.ensureAuth,  infoController.updateDataConteo1);
api.post('/update-conteo-2/:tag', md_auth.ensureAuth,  infoController.updateDataConteo2);
api.post('/update-conteo-3/:tag', md_auth.ensureAuth,  infoController.updateDataConteo3);
api.post('/update-conteo-4/:tag', md_auth.ensureAuth,  infoController.updateDataConteo4);
api.post('/update-conteo-d/:tag', md_auth.ensureAuth,  infoController.updateDataConteoDefinitivo);
api.post('/update-conteo-defi/:tag', md_auth.ensureAuth,  infoController.updateDataConteoDefinitivoDefinitvo);
api.post('/update-conteo-justificacion/:tag', md_auth.ensureAuth,  infoController.updateDataConteoJustificacion);
// api.post('/update-conteo-defi-many/:tag', md_auth.ensureAuth,  infoController.updateDataConteoDefinitivoDefinitvoMany);
api.post('/contar/:tag', md_auth.ensureAuth,  infoController.contarEan);
api.post('/contar-sku/:tag', md_auth.ensureAuth,  infoController.contarSKU);
api.get('/conteo-tag/:tag', md_auth.ensureAuth,  infoController.getConteoTag);
api.post('/off-inventario/:tag', md_auth.ensureAuth,  infoController.renametCollectionsInventarios);
api.post('/delete-inventario/:tag', md_auth.ensureAuth,  infoController.deleteCollectionsInventarios);

api.post('/rename', infoController.renameCollectionsDB);

// RUTAS OPERACION

api.get('/operaciones',md_auth.ensureAuth, OperacionController.getOperaciones);
api.post('/reg-operacion/', md_auth.ensureAuth, OperacionController.saveOperacion);
api.delete('/operacion/:id',md_auth.ensureAuth, OperacionController.deleteOperacion);
api.put('/operacion', md_auth.ensureAuth,  OperacionController.updateOperacion);

// RUTAS ELECTRONICA

api.get('/electronica',md_auth.ensureAuth, ElectronicaController.getElectronica);
api.post('/reg-electronica/', md_auth.ensureAuth, ElectronicaController.saveElectronica);
api.delete('/electronica/:id',md_auth.ensureAuth, ElectronicaController.deleteElectronica);
api.put('/electronica', md_auth.ensureAuth,  ElectronicaController.updateElectronica);


// RUTAS CONSECUTIVOS

api.get('/consecutivos-op/:id',md_auth.ensureAuth, ConsecutivoController.getConsecutivoOperacion);
api.post('/reg-consecutivo', md_auth.ensureAuth, ConsecutivoController.saveConsecutivo);
api.delete('/consecutivo/:id',md_auth.ensureAuth, ConsecutivoController.deleteConsecutivo);
api.put('/consecutivo', md_auth.ensureAuth,  ConsecutivoController.updateConsecutivo);


// RUTAS PRODUCTOS

api.get('/producto/:id',md_auth.ensureAuth, infoController.getProductoEan);


// RUTAS CONSECUTIVOS

api.get('/notas-venta-user/:id',md_auth.ensureAuth, NotasVentaController.getNotaVentaUser);
api.get('/notas-venta-activa-user/:id',md_auth.ensureAuth, NotasVentaController.getNotaVentaActivaUser);
api.post('/notas-venta-date',md_auth.ensureAuth, NotasVentaController.totalVentasPeriodo);
api.get('/notas-venta-op/:id',md_auth.ensureAuth, NotasVentaController.getNotaVentaOperacion);
api.get('/notas-venta-activa-op/:id',md_auth.ensureAuth, NotasVentaController.getNotaVentaActivasOperacion);
api.post('/nota-venta', md_auth.ensureAuth, NotasVentaController.saveNotaVenta);
// api.delete('/consecutivo/:id',md_auth.ensureAuth, ConsecutivoController.deleteConsecutivo);
api.put('/nota-venta', md_auth.ensureAuth,  NotasVentaController.updateNotaVenta);

module.exports = api;

