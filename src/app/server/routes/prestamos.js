const express = require('express');
const _ = require('underscore');
const app = express();
const prestamos = require('../models/prestamos');

app.get('/prestamos', (req,res)=>{
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    prestamos.find({estado: true})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuarios libros', 'id')
    .exec((err, prestamos) =>{
        if (err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al consultar los prestamos',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Prestamos consultados con exito',
            conteo: prestamos.length,
            prestamos
        })
    })
});

app.post('/prestamos/registrar', (req,res)=>{
    let pre = new prestamos({
        idL: req.body.idL,
        idU: req.body.idU,
        libro: req.body.libro,
        usuario: req.body.usuario,
        estado: req.body.estado,
        fechaPrestamo: req.body.fechaPrestamo,
        fechaDevolucion: req.body.fechaDevolucion
    });

    pre.save((err,preDB)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al realizar el prestamo',
                err
            })
        }
        res.json({
            ok: true,
            msg: 'Prestamo exitoso',
            preDB
        });
    });
});

app.put('/prestamos/registrar/:id', (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['idL', 'idU', 'libro', 'usuario', 'estado', 'fecha']);

    prestamos.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err,preDB)=>{
        if (err){
            return res.status(400).json({
                ok: true,
                msg: 'Ocurrio un error al renovar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Prestamo renovado con exito',
            preDB
        });
    });
});

app.delete('/prestamos/eliminar/:id', (req,res) => {
    let id = req.params.id;
    prestamos.findByIdAndUpdate(id, {estado: false}, {new: true, runValidators: true, context: 'query'}, (err,preDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al devolver',
                err
            });
        }
        
        res.json({
            ok: true,
            msg: 'Prestamo devuelto con exito',
            preDB
        });
    });
});

module.exports = app;