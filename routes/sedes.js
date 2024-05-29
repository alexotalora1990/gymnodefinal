import { Router } from 'express';
import httpSede from '../controllers/sedes.js';
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersSedes from '../helpers/sedes.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get('/', httpSede.getSede);
router.get('/Sede/:id', httpSede.getSedePorId);
router.get('/activos', httpSede.getSedesActivas);
router.get('/inactivos', httpSede.getSedesInactivas);
router.post('/',
  [
    check("nombre", "Nombre no puede estar vacío").notEmpty(),
    check("direccion", "Dirección no puede estar vacía").notEmpty(),
    check("horario", "Horario no puede estar vacío").notEmpty(),
    check("telefono", "Teléfono no puede estar vacío").notEmpty(),
    check("telefono", "Solo números").isNumeric(),
    check("ciudad", "Ciudad no puede estar vacía").notEmpty(),
    validarCampos,
  ],
  httpSede.postcrearSede
);

router.put('/:id',
  [
    check("id", "Se necesita un mongoid válido").isMongoId(),
    check("id").custom(helpersSedes.validarExistaId),
    validarCampos,
  ],
  httpSede.putactualizarSede
);

router.put('/activar/:id',
  [
    check("id", "Se necesita un mongoid válido").isMongoId(),
    check("id").custom(helpersSedes.validarExistaId),
    validarCampos,
  ],
  httpSede.putSedeActivar
);

router.put('/desactivar/:id',
  [
    check("id", "Se necesita un mongoid válido").isMongoId(),
    check("id").custom(helpersSedes.validarExistaId),
    validarCampos,
  ],
  httpSede.putinactivarSede
);

export default router;
