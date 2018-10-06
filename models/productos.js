var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tipos = {
    values: ['MICA', 'USORUDO', 'TEMPLADOS', 'BOCINAS', 'AUDIFONOS']
};
var modelos = {
    values: ['IPHONE3', 'IPHONE4', 'IPHONE5', 'IPHONE6', 'IPHONE7']
};
var productoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    tipo: { type: String, required: [true, 'la cuenta es necesario'], enum: tipos },
    modelo: { type: String, required: false, enum: modelos },
    descripcion: { type: String, required: false }

}, { versionKey: false });

var modProductos = mongoose.model('producto', productoSchema);
module.exports = modProductos;