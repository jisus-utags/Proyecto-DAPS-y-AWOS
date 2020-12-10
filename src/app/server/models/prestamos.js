const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let prestamosSchema = new Schema({
    idL: {
        type: Schema.Types.ObjectId,
        ref: 'libros'
    },
    idU: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    libro: {
        type: String,
        required: [true, 'El libro es obligatorio']
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaPrestamo: {
        type: String,
        required: [true, 'El año es requerido']
    },
    fechaDevolucion: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('prestamos', prestamosSchema)