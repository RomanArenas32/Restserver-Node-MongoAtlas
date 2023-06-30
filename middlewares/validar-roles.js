const { response } = require('express');

const esAdminRol = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Usuario no autorizado'
        })
    }
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} Usted no cuenta con los permisos necesarios`
        })
    }


    next();
}


const tieneRol = (...roles) => {

    return (req, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Verifica el rol y token del usuario'
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(400).json({
                msg: `Permisos no validos para dicha accion se requiere: ${roles}`
            })
        }

        next();
    }


}

module.exports = {
    esAdminRol,
    tieneRol

};