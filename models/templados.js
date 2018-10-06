var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var templadoSchema = new Schema({
    marca: { type: String, required: true, },
    modelo: { type: String, required: true, },
    version: { type: String, required: false, },
    costo: { type: Number, required: true, }
});
var modTemplado = mongoose.model('templado', templadoSchema);
module.exports = modTemplado;