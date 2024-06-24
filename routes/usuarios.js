

import { Router } from 'express';
import httpUsuarios from '../controllers/usuarios.js';
import { check } from "express-validator";
import helpersUsuarios from '../helpers/usuarios.js';
import helpersSedes from '../helpers/sedes.js';
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', httpUsuarios.getUsuarios);
router.get('/', httpUsuarios.getUsuarios1);
router.get('/usuarios/:id', httpUsuarios.getUsuariosId);
router.get('/activos', httpUsuarios.getUsuariosActivos);
router.get('/inactivos', httpUsuarios.getUsuariosInactivos);

router.post('/', [
  check("nombre", "Nombre no puede estar vacio").notEmpty(),
  check("idsede", "Sede no puede estar vacio").notEmpty(),
  check("email", "email no puede estar vacio").notEmpty(),
  check("password", "clave puede estar vacio").notEmpty(),
  check("password", "clave debe tener ...").isStrongPassword(),
  check("telefono", "telefono no debe estar vacio").notEmpty(),
  check("telefono", "Solo numeros").isNumeric(),
  check("roll", "roll no debe estar vacio").notEmpty(),
  check("email").custom(helpersUsuarios.validarEmailUnico),
  check("idsede").custom(helpersSedes.validarExistaId),
  validarCampos,
], httpUsuarios.postCrearUsuario);

router.put('/:id', [
  check("id", "Se necesita un mongoid valido").isMongoId(),
  check("id").custom(helpersUsuarios.validarExistaId),
  validarCampos,
], httpUsuarios.putUsuarios);

router.put('/activar/:id', [
  check("id", "Se necesita un mongoid valido").isMongoId(),
  check("id").custom(helpersUsuarios.validarExistaId),
  validarCampos,
], httpUsuarios.putUsuariosActivar);

router.put('/desactivar/:id', [
  check("id", "Se necesita un mongoid valido").isMongoId(),
  check("id").custom(helpersUsuarios.validarExistaId),
  validarCampos,
], httpUsuarios.putUsuariosDesactivar);

router.put('/:id/listar', [
  check("id", "Se necesita un mongoid valido").isMongoId(),
  check("id").custom(helpersUsuarios.validarExistaId),
  validarCampos,
], httpUsuarios.putListar);

router.post('/login', [
  check("email", "Se necesita un correo  valido").notEmpty(),
  check("password", "Se necesita una contraseña valido").notEmpty(),
  validarCampos,
], httpUsuarios.login);

router.post('/recuperarPassword', httpUsuarios.solicitarRecuperacion);

router.post('/resetPassword', [
  check('token', 'El token es requerido').notEmpty(),
  check('nuevaContraseña', 'La nueva contraseña es requerida').notEmpty(),
  validarCampos,
], httpUsuarios.actualizarContraseña);

export default router;
