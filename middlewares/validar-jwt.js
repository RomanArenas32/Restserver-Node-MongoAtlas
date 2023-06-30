const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');


    if (!token) {
        res.status(408).json({
            msg: 'Token inexistente'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        const usuario =  await Usuario.findById(uid);
        if(!usuario){
            return res.status(408).json({
                msg: 'Usuario inexistente'
            })
        }
        if(!usuario.estado){
           return res.status(401).json({
                msg: 'Usuario sin permisos'
            })
        }


        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}


module.exports = validarJWT;