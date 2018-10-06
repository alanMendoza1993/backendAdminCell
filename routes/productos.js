var express = require('express');

var app = express();

var modProductos = require('../models/productos');

app.get('/', (req, res) => {
    modProductos.find({}, (err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: "error al buscar usuarios"
            });
        }

        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });
    });
});

app.post('/', (req, res) => {
    var body = req.body;
    var producto = new modProductos({
        nombre: body.nombre,
        tipo: body.tipo,
        modelo: body.modelo,
        descripcion: body.descripcion
    });

    producto.save((err, productoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: "error al guardar producto"
            });
        }
        res.status(200).json({
            ok: true,
            producto: productoGuardado
        });
    });
});

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    modProductos.findById(id, (err, producto) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: "error al buscar usuario"
            });
        }
        producto.nombre = body.nombre;
        producto.tipo = body.tipo;
        producto.modelo = body.modelo;
        producto.descripcion = body.descripcion;

        producto.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    error: "error al guardar",
                    err
                });
            }

            res.status(200).json({
                ok: true,
                producto: productoGuardado
            });
        });

    });
});

/////DELETE////DELETE/////

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    modProductos.findByIdAndDelete(id, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: "error al buscar usuario"
            });
        }

        res.status(200).json({
            ok: true,
            producto: productoBorrado
        });
    });
});
module.exports = app;