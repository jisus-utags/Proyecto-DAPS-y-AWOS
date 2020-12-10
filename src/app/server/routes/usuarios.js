const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const usuarios = require('../models/usuarios');
const app = express();

app.get('/usuarios', function (req, res){
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    usuarios.find({estado: true})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) => {
        if (err){
            return res.status(400).json({
                ok: false,
                msg: "ocurrio un error al consultar los usuarios",
                err
            });
        }

        res.json({
            ok: true,
            msg: "listado de usuarios",
            conteo: usuarios.length,
            usuarios
        });
    });
});

app.post('/usuarios/registrar', function(req, res){
    let body = req.body;
    let usu = new usuarios({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usu.save((err, usuDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al ingresar los datos',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario registrado con exito',
            usuDB
        });
    });
});

app.put('/usuarios/registrar/:id', function(req,res){
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'password']);

    usuarios.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err,usuDB)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'usuario actualizado con exito',
            usuarios: usuDB
        });
    });
});

app.delete('/usuarios/eliminar/:id', function(req,res){
    let id = req.params.id;

    usuarios.findByIdAndUpdate(id, { estado: false}, {new: true, runValidators: true, context: 'query'}, (err,usuDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al eliminar',
                err
            });
        }
        
        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usuDB
        });
    });
});

module.exports = app;