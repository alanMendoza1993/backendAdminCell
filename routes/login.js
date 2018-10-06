var express = require('express');

var app = express();

var modUsuario = require('../models/usuarios');
var SEED = require('../config/config').SEED;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

/////////post//////post//////////post///////////////
app.post('/', (req, res) => {
    var body = req.body;

    modUsuario.findOne({ usuario: body.usuario }, (err, usuarioEncontrado) => {
        /**/

        if (err) {
            return res.status(400).json({
                ok: false,
                error: "error al buscar usuario"
            });
        }
        if (usuarioEncontrado) {
            if (!bcrypt.compareSync(body.contrasena, usuarioEncontrado.contrasena)) {
                res.status(200).json({
                    ok: false,
                    mensaje: "la contraseña es erronea"
                });
            }
            ////genereando token/////
            var token = jwt.sign({ usuario: usuarioEncontrado }, SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true,
                encontrado: usuarioEncontrado,
                token: token
            });
        }
        res.status(200).json({
            ok: false,
            mensaje: "El usuario no existe"
        });





    });
});

module.exports = app;