const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async (rol)=> {
    const existe = await Role.findOne({rol})
    if(!existe){
        throw new Error('El rol no es un rol valido')
    }
}

const emailExiste = async(correo) =>{
    const existe = await Usuario.findOne({correo});
    if(existe){
        throw new Error('El correo ya existe en la base de datos. Lo siento!')
    }
}
const exiteId = async(id) =>{
    const existe = await Usuario.findById(id); //busca x id
    if(!existe){
        throw new Error('El id es inexistente. Lo siento!')
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    exiteId
}