const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuariosSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        require: [true, 'El correo es necesario'], 
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña se requiere']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('usuarios',usuariosSchema); 