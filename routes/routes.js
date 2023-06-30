const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, exiteId } = require('../helpers/db-validators');
const validarJWT = require('../middlewares/validar-jwt');
const {esAdminRol, tieneRol} = require('../middlewares/validar-roles');
const routes = Router();


routes.get('/', getUsers);
routes.post('/',

    [
        check('nombre', 'El nombre no puede ser un campo vacio').not().isEmpty(),
        check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('rol').custom(esRolValido),
        validarCampos
    ]
    , postUsers);
routes.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(exiteId),
    check('rol').custom(esRolValido),

], putUsers);
routes.delete('/:id',

    [

        validarJWT,
        esAdminRol,
        tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(exiteId),
        validarCampos
    ]
    , deleteUsers);




module.exports = routes;