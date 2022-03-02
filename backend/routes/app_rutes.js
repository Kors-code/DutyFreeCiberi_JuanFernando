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
api.get('/info-collections',md_auth.ensureAuth, infoController.getCollections);
api.get('/data-collections/:tag',md_auth.ensureAuth, infoController.getDataCollection);
api.get('/headers-collections/:tag',md_auth.ensureAuth, infoController.getHeadersCollection);
api.post('/key-collections/:tag',md_auth.ensureAuth, infoController.getDataCollectionKey);
api.post('/update-document/:tag',md_auth.ensureAuth, infoController.updateDataCollection);
// api.get('/info-categrias',md_auth.ensureAuth, infoController.getInformeCategoria);
api.get('/info-categrias/:tag',md_auth.ensureAuth, infoController.consultarInfoCategoria);
api.get('/info-folio/:tag',md_auth.ensureAuth, infoController.consultarInfoFolio);
api.get('/info-collection-estado/:tag/:estado',md_auth.ensureAuth, infoController.getDataCollectionEstado);
api.get('/facturacion-siigo/:tag',md_auth.ensureAuth, infoController.getfacturacionSiigo);

api.delete('/info/:tag/:doc',md_auth.ensureAuth, infoController.deleteDataCollection);
// SIIGO RUTAS

api.post('/auth-siigo', md_auth.ensureAuth,  siigoController.authSiigo);
api.get('/up-invoice/:tag',md_auth.ensureAuth, siigoController.sendInvoiceSiigo);
api.get('/invoice-siigo/:tag',md_auth.ensureAuth, siigoController.getFacturacionSiigo);



module.exports = api;

