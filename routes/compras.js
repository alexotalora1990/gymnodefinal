import { Router } from "express";
import httpCompras from "../controllers/compras.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersCompras from "../helpers/compras.js";
import helpersProveedor from "../helpers/proveedor.js"
import helpersProductos from '../helpers/productos.js';
import helpersSedes from '../helpers/sedes.js';
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get('/', httpCompras.getCompras); 
router.get('/:id', httpCompras.getComprasId); 



router.post('/', [ 
  check('idproveedor', 'Id proveedor no puede estar vacío').notEmpty(),
  check('idproveedor', 'Se requiere un mongoId válido para idproveedor').isMongoId(),
  check('idproducto', 'Id producto no puede estar vacío').notEmpty(),
  check('idproducto', 'Se requiere un mongoId válido para idproducto').isMongoId(),
  check('idsede', 'Id sede no puede estar vacío').notEmpty(),
  check('idsede', 'Se requiere un mongoId válido para idsede').isMongoId(),
  check('cantidad', 'Cantidad no puede estar vacía').notEmpty(),
  check('idproveedor').custom(helpersProveedor.validarExistaProveedorID), 
  check('idsede').custom(helpersSedes.validarExistaId),
  check('idproducto').custom(helpersProductos.validarExistaId),  
  validarCampos,
], httpCompras.postCompras); // Ruta para crear una nueva venta
 
router.put('/:id', [
  check('id', 'Se necesita un mongoId válido').isMongoId(),
  check('id').custom(helpersCompras.validarExistaId),
  validarCampos,
], httpCompras.putactualizarCompras); // Ruta para actualizar una venta por su ID

   

export default router;