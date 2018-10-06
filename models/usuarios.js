var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var validator = {
    values: ['ADMIN', 'USER', 'ENCARGADO', 'TECNICO', 'CAJAS']
};

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    cuenta: { type: String, required: [true, 'la cuenta es necesario'], enum: validator },
    contrasena: { type: String, required: [true, 'la contrasena es necesario'] },
    usuario: { type: String, required: [true, 'El usuario es necesario'] }

}, { versionKey: false });
var modUsuario = mongoose.model('usuario', usuarioSchema);
module.exports = modUsuario;