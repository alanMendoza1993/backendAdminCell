var express = require('express');

var app = express();

var modTemplado = require('../models/templados');

app.get('/', (req, res, next) => {

    modTemplado.find({}, (err, catTemplado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "ocurrio un problema",
                errors: err

            });
        }

        if (!catTemplado) {
            return res.status(500).json({
                of: false,
                catTemplado
            });
        }

        res.status(200).json({
            ok: true,
            catTemplado: catTemplado

        });
    });
});

module.exports = app;