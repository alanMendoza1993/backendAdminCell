//requires
var express = require('express');
var mongoose = require('mongoose');

//Inicializar Variables
var app = express();

//conexion a bd

mongoose.connection.openUri('mongodb://localhost:27017/adminCell', (err, res) => {
    if (err) throw err;

    console.log("express en linea");
});

//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: "peticion Realizada correctamente"
    });
});

app.listen(3000, () => {
    console.log("Express server puerto 3000");
});