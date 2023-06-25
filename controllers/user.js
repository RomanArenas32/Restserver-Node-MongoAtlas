const { response, request } = require('express');
const Usuario = require('../models/usuario'); //nos permite crear una instancia de nuestro model de Usuarios
const bcryptjs = require('bcryptjs');



const getUsers = async (req = request, res = response) => {

    //const usuarios = await Usuario.find(); //trae todos los usuarios
    // const usuarios = await Usuario.find().limit(5); //traae 5 usuarios del total

    const { limite = 5, desde = 0 } = req.query;
    /*const usuarios = await Usuario.find( {estado : true})  //solamente va a traer aquellos usuarios activos
    .skip(Number(desde))
    .limit(Number(limite));*/



    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.status(200).json({
        total,
        usuarios
    })
};

const postUsers = async (req, res = response) => {



    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });

    //antes de hacer la grabacion verificamos si el correo existe

    const siExiste = await Usuario.findOne({ correo })
    if (siExiste) {
        return res.status(400).json({
            msg: "El correo ya esta registrado"
        })
    }

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10); //sacado de la documentacion
    usuario.password = bcryptjs.hashSync(password, salt); //sacado de la documentacion

    //guardar en base de datos
    await usuario.save();   //guarda el usuario nuevo en la base de datos



    res.json({
        usuario
    })
};
const putUsers = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar en base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto); // Corrección en esta línea

    res.json({
        msg: "Petición PUT",
        usuario
    });
};



const deleteUsers = async (req = request, res = response) => {

    const { id } = req.params;

   // const usuario = await Usuario.findByIdAndDelete(id); //borra el usuario por completo, no recomendable si es que el usuario ha creado cosas etc porque perderiamos para siempre la referencia

   const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});    //en ves de eliminarlo por completo vamos a cambiar el estado a false para que no se visualize
    res.status(200).json({
        msg: "Usuario eliminado/restringido exitosamente",
        usuario
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers

}