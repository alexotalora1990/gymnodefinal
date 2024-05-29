import { Router } from 'express';
import httpPlan from '../controllers/planes.js';
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersPlanes from '../helpers/planes.js';
import helpersClientes from "../helpers/clientes.js";
import helpersPagos from '../helpers/pagos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get('/', httpPlan.getPlan); 
router.get('/Plan/:id', httpPlan.getPlanPorId);
router.get('/activos', httpPlan.getPlanesActivos);
router.get('/inactivos', httpPlan.getPlanesInactivos);
router.post('/',
[
    
    check("descripcion", "Descripcion no puede estar vacio").notEmpty(),
    check("valor", " Valor no puede estar vacio").notEmpty(),
    check("dias", " dias no puede estar vacio").notEmpty(),
    validarCampos,
],
 httpPlan.postcrearPlan);

router.put('/:id',
[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersPlanes.validarExistaId),
    validarCampos,
],

httpPlan.putactualizarPlan);

router.put('/activar/:id', 
[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersPlanes.validarExistaId),
    validarCampos,
],

httpPlan.putactivarPlan);

router.put('/desactivar/:id',
[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersPlanes.validarExistaId),
    validarCampos,
],

httpPlan.putinactivarPlan
);



export default router;