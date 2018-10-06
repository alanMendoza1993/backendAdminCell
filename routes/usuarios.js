var express = require('express');

var app = express();

var modUsuario = require('../models/usuarios');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var auth = require('../auth/auth').atutToken;


////////////////////GET///////GET////////GET/////////////
app.get('/', (req, res) => {
    modUsuario.find({}, "nombre usuario").exec((err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: { massage: 'Error en la busqueda' }
            });
        }
        if (!usuarios) {
            return res.status(500).json({
                ok: false,
                error: { massage: 'Error al devolver usuarios' }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarios
        });
    });
});

///////////POST/////////POST//////////POST////////////
app.post('/', auth, (req, res) => {
    var body = req.body;
    var usuarioP = new modUsuario({
        nombre: body.nombre,
        cuenta: body.cuenta,
        contrasena: bcrypt.hashSync(body.contrasena, 10),
        usuario: body.usuario
    });


    usuarioP.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                errors: "problema al enviar usuario",
                err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });

});
////////PUT////////PUT///////////////PUT
app.put('/:id', auth, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    modUsuario.findById(id, (err, usuarioP) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: "Error al buscar usuario"
            });
        }
        if (!usuarioP) {
            return res.status(400).json({
                ok: false,
                error: "El usuario no existe"
            });
        }

        usuarioP.nombre = body.nombre;
        usuarioP.cuenta = body.cuenta;
        usuarioP.contrasena = body.contrasena;
        usuarioP.usuario = body.usuario;

        usuarioP.save((err, usuarioGuardado) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    error: "Error al guardar usuario",
                    err
                });
            }

            res.status(200).json({
                ok: true,
                usuarioGuardado: usuarioGuardado
            });
        });



    });

});
////////DELETE//////////DELETE//////////DELETE///////////
app.delete('/:id', auth, (req, res) => {
    var id = req.params.id;
    modUsuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: 'falla al borrar'
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});
module.exports = app;