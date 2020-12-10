const express = require('express');
const _ = require('underscore');
const app = express();
const libros = require('../models/libros');

app.get('/libros', (req,res)=> {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    libros.find({estado: true})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, libros) =>{
        if (err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al consultar los libros',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Libros consultados con exito',
            conteo: libros.length,
            libros
        })
    })
});

app.post('/libros/registrar', (req,res)=>{
    let lib = new libros({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        autor: req.body.categoria,
        editorial: req.body.editorial,
        estado: req.body.estado,
        fecha: req.body.fecha
    });

    lib.save((err,libDB)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al registrar un libro',
                err
            })
        }
        res.json({
            ok: true,
            msg: 'Libro insertado con exito',
            libDB
        });
    });
});

app.put('/libros/registrar/:id', (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'categoria', 'autor', 'editorial', 'estado', 'fecha']);

    libros.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err,libDB)=>{
        if (err){
            return res.status(400).json({
                ok: true,
                msg: 'Ocurrio un error actualizar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Libro actualizado con exito',
            libDB
        });
    });
});

app.delete('/libros/eliminar/:id', (req,res) => {
    let id = req.params.id;

    libros.findByIdAndUpdate(id, { estado: false}, {new: true, runValidators: true, context: 'query'}, (err,libDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al eliminar',
                err
            });
        }
        
        res.json({
            ok: true,
            msg: 'Libro eliminado con exito',
            libDB
        });
    });
});

module.exports = app;