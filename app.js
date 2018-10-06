//requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//Inicializar Variables
var app = express();

//body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//escuchar peticion
app.listen(3000, () => {
    console.log("puerto 3000");
});

//importar rutas
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/routes');
var templadosRoutes = require('./routes/templados');
var usuariosRoutes = require('./routes/usuarios');
var productosRoutes = require('./routes/productos');

//conexion a bd

var db = mongoose.connection.openUri('mongodb://localhost:27017/adminCell', (err, res) => {
    if (err) throw err;

    console.log("express en linea de que");
});

//rutas
app.use('/login', loginRoutes);
app.use('/productos', productosRoutes);
app.use('/templados', templadosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/', appRoutes);