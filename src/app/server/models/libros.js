const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let librosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    categoria: {
        type: String,
        required: [true, 'La categoria es obligatoria']
    },    
    autor: {
        type: String,
        required: [true, 'El autor es obligatorio']
    },
    editorial: {
        type: String,
        required: [true, 'La editorial es necesaria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: String,
        required: [true, 'El año es requerido']
    }
});

module.exports = mongoose.model('libros', librosSchema)