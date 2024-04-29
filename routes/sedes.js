import { Router } from 'express';
import httpSede from '../controllers/sedes.js';
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersSedes from '../helpers/sedes.js';

const router = Router();

router.get('/', httpSede.getSede); 
router.get('/Sede/:id', httpSede.getSedePorId);
router.get('/activos', httpSede.getSedesActivas);
router.get('/inactivos', httpSede.getSedesInactivas);
router.post('/',
[
    check("nombre", "Nombre no puede estar vacio").notEmpty(),  
    check("direccion", "Direccion no puede estar vacio").notEmpty(),
    check("horario", "horario no puede estar vacio").notEmpty(),
    check("telefono", "telefono no puede estar vacio").notEmpty(),
    check("telefono", "Solo numeros").isNumeric(),
    check("ciudad", "ciudad no puede estar vacio").notEmpty(),
    
    validarCampos,
  ],
httpSede.postcrearSede);

router.put('/:id',
[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersSedes.validarExistaId),
    validarCampos,
  ],
httpSede.putactualizarSede);

router.put('/:id/activar',
[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersSedes.validarExistaId),
    validarCampos,
  ],
 httpSede.putactivarSede);
router.put('/:id/inactivar',
[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersSedes.validarExistaId),
    validarCampos,
  ],
httpSede.putinactivarSede);



export default router;
