'use strict'


var express = require('express');
var UserController = require('../controllers/users');
var infoController = require('../controllers/info');
var siigoController = require('../controllers/siigo');

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
api.post('/info-paginate',md_auth.ensureAuth, infoController.getRegistros);
api.put('/update-info',  md_auth.ensureAuth, infoController.updateInfo);
api.post('/info-search',md_auth.ensureAuth, infoController.getInfoDato);
api.get('/info-vendedor/:tag',md_auth.ensureAuth, infoController.getInformeVendedor);
api.get('/info-vendedor-ppto/:tag',md_auth.ensureAuth, infoController.getInformePresupuesoVendedor);
api.get('/info-collections',md_auth.ensureAuth, infoController.getCollections);
api.get('/data-collections/:tag',md_auth.ensureAuth, infoController.getDataCollection);
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

api.post('/auth-siigo', md_auth.ensureAuth,  siigoController.authSiigo);
api.post('/up-invoice/:tag',md_auth.ensureAuth, siigoController.sendInvoiceSiigo);
api.post('/invoice-siigo/:tag',md_auth.ensureAuth, siigoController.getFacturacionSiigo);
api.post('/journals-siigo/:tag',md_auth.ensureAuth, siigoController.getComprobantesSiigo);
api.post('/journals',md_auth.ensureAuth, siigoController.sendComprobanteSiigo);

// PRESUPUESTOS
api.post('/presupuesto', md_auth.ensureAuth,  infoController.agregarPresupuesto);
api.get('/presupuestos', md_auth.ensureAuth,  infoController.getDataPresupuesto);
api.get('/presupuestos-tag/:tag', md_auth.ensureAuth,  infoController.getDataPresupuestoTag);
api.post('/presupuesto-delete', md_auth.ensureAuth,  infoController.deleteDataPresupuesto);
api.put('/presupuesto', md_auth.ensureAuth,  infoController.updateDataPresupuesto);


// CONFIGURACION
api.post('/configuracion', md_auth.ensureAuth,  infoController.agregarConfiguracion);
api.get('/configuracion', md_auth.ensureAuth,  infoController.getDataConfig);

api.put('/configuracion', md_auth.ensureAuth,  infoController.updateDataConfiguracion);
api.put('/config-clave-empleado', md_auth.ensureAuth,  infoController.updateClaveEmpleadoConfiguracion);


// INVENTARIOS 

api.post('/master-conteo/:tag', md_auth.ensureAuth,  infoController.agregarConteo);
api.post('/update-conteo-1/:tag', md_auth.ensureAuth,  infoController.updateDataConteo1);
api.post('/update-conteo-2/:tag', md_auth.ensureAuth,  infoController.updateDataConteo2);
api.post('/update-conteo-3/:tag', md_auth.ensureAuth,  infoController.updateDataConteo3);
api.post('/update-conteo-4/:tag', md_auth.ensureAuth,  infoController.updateDataConteo4);
api.post('/update-conteo-d/:tag', md_auth.ensureAuth,  infoController.updateDataConteoDefinitivo);
api.post('/update-conteo-defi/:tag', md_auth.ensureAuth,  infoController.updateDataConteoDefinitivoDefinitvo);
// api.post('/update-conteo-defi-many/:tag', md_auth.ensureAuth,  infoController.updateDataConteoDefinitivoDefinitvoMany);
api.post('/contar/:tag', md_auth.ensureAuth,  infoController.contarEan);
api.post('/contar-sku/:tag', md_auth.ensureAuth,  infoController.contarSKU);
api.get('/conteo-tag/:tag', md_auth.ensureAuth,  infoController.getConteoTag);

module.exports = api;

