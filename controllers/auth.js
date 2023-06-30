const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const generarJWT = require('../helpers/generarJWT');

const fnLogin = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //verificar si el usuario existe;
        const usuario = await Usuario.findOne({ correo }); //comprueba la existencia con el correo
        if(!usuario){
            return res.status(400).json({
                msg: 'correo y/o contraseña incorrectos'
            });
        }
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usted esta restringido'
            });
        }

        //verificar la contraseña

        const verificarPass = bcryptjs.compareSync(password, usuario.password);

        if(!verificarPass){
            return res.status(400).json({
                msg: 'correo y/o contraseña incorrectos'
            });
        }

        //generar web token

        const token = await generarJWT(usuario.id);

        return res.status(200).json({
            usuario,
            token
        })

    } catch (error) {
        res.json({
            msg: "Parece que algo salio mal :("
        })
    }


}


module.exports = fnLogin;