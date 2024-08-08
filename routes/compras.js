import { Router } from "express";
import httpCompras from "../controllers/compras.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersCompras from "../helpers/compras.js";
import helpersProveedores from '../helpers/proveedores.js';
import helpersProductos from '../helpers/productos.js';
import helpersSedes from '../helpers/sedes.js';
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get('/', httpCompras.getCompras); 
router.get('/:id', httpCompras.getComprasId); 

router.get('/porDia/:dia', httpCompras.getComprasPorDia); 
 
router.get('/porFecha/:fechaInicio/:fechaFin',httpCompras.getComprasEntreFechas);  

router.post('/', [ 
  check('idproveedor', 'Id proveedor no puede estar vacío').notEmpty(),
  check('idproveedor', 'Se requiere un mongoId válido para idproveedor').isMongoId(),
  check('idproducto', 'Id producto no puede estar vacío').notEmpty(),
  check('idproducto', 'Se requiere un mongoId válido para idproducto').isMongoId(),
  check('idsede', 'Id sede no puede estar vacío').notEmpty(),
  check('idsede', 'Se requiere un mongoId válido para idsede').isMongoId(),
  check('cantidad', 'Cantidad no puede estar vacía').notEmpty(),
  check('idproveedor').custom(helpersProveedores.validarExistaId), 
  check('idsede').custom(helpersSedes.validarExistaId),
  check('idproducto').custom(helpersProductos.validarExistaId),  
  validarCampos,
], httpCompras.postCompras); // Ruta para crear una nueva venta
 
router.put('/:id', [
  check('id', 'Se necesita un mongoId válido').isMongoId(),
  check('id').custom(helpersCompras.validarExistaId),
  validarCampos,
], httpCompras.putactualizarCompras); // Ruta para actualizar una venta por su ID

router.put('/listar/:id', [
  check('id', 'Se necesita un mongoId válido').isMongoId(), 
  check('id').custom(helpersCompras.validarExistaId), 
  validarCampos, 
], httpCompras.putListar); // Ruta para listar una venta por su ID


export default router;