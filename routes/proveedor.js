import {Router} from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import httpProveedor from '../controllers/proveedor.js'
import helperProveedor from '../helpers/proveedor.js'

const router = Router()

router.get('/listar',[
    // validarJWT,
    validarCampos
], httpProveedor.getProveedor)

router.get('/listarid/:id', [
    // validarJWT,
    validarCampos
], httpProveedor.getProveedorID);

router.get('/activos', [
    // validarJWT,
    validarCampos
], httpProveedor.getProveedorActivo)

router.get('/inactivos', [
    // validarJWT,
    validarCampos
], httpProveedor.getProveedorInactivo)

router.post('/agregar', [
    // validarJWT,
    check('nombre', 'El espacio del nombre no puede estar vacio').notEmpty(),
    check("documento", "Documento no puede estar vacio").notEmpty(),
    check('direccion', 'El espacio de la Dirrecion no puede estar vacio').notEmpty(),
    check('telefono', 'El espacio del telefono no puede estar vacio').notEmpty(),
    check('telefono', 'Se necesita que el telefono sea numerico').isNumeric(),
    check('correo', 'Se necesita agregar un correo').notEmpty(),
    check('correo').custom(helperProveedor.CorreoUnicoProveedor),
    check("documento", "Solo numeros").isNumeric(),
    check("documento").custom(helperProveedor.validarDocumento),
    validarCampos
], httpProveedor.postProveedor)

router.put('/editar/:id',[
    // validarJWT,
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putProveedor)


router.put('/activar/:id', [
    // validarJWT,
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putProveedorActivo)
router.put('/desactivar/:id', [
    // validarJWT,
    check('id', 'Se necesita un mongoID que sea valido').isMongoId(),
    check('id').custom(helperProveedor.validarExistaProveedorID),
    validarCampos
], httpProveedor.putProveedorInactivo)

export default router