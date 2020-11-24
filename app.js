'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app= express();
var path= require('path');

//cargar archivos de rutas
var product_routes = require('./routes/product');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(cors())
//rutas
app.use('/',express.static('client',{redirect:false}));
app.use('/api',product_routes);

app.get('*', function(req,res,next){
	res.sendFile(path.resolve('client/index.html'));
});

//exportar
module.exports = app;