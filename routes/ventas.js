

import { Router } from 'express';
import { check } from 'express-validator';
import httpVenta from '../controllers/ventas.js'; // Asegúrate de que este sea el controlador correcto
import helpersClientes from '../helpers/clientes.js';
import helpersProductos from '../helpers/productos.js';
import helpersSedes from '../helpers/sedes.js';
import helpersVentas from '../helpers/ventas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', httpVenta.getVentas); // Ruta para obtener todas las ventas
router.get('/:id', httpVenta.getVentasId); // Ruta para obtener una venta por su ID

router.get('/porDia/:dia', httpVenta.getVentasPorDia); 
 
router.get('/porFecha/:fechaInicio/:fechaFin',httpVenta.getVentasEntreFechas);  

router.post('/', [ 
  check('idcliente', 'Id cliente no puede estar vacío').notEmpty(),
  check('idcliente', 'Se requiere un mongoId válido para idcliente').isMongoId(),
  check('idproducto', 'Id producto no puede estar vacío').notEmpty(),
  check('idproducto', 'Se requiere un mongoId válido para idproducto').isMongoId(),
  check('idsede', 'Id sede no puede estar vacío').notEmpty(),
  check('idsede', 'Se requiere un mongoId válido para idsede').isMongoId(),
  check('cantidad', 'Cantidad no puede estar vacía').notEmpty(),
  check('idcliente').custom(helpersClientes.validarExistaId), 
  check('idsede').custom(helpersSedes.validarExistaId),
  check('idproducto').custom(helpersProductos.validarExistaId),  
  validarCampos,
], httpVenta.postVentas); // Ruta para crear una nueva venta
 
router.put('/:id', [
  check('id', 'Se necesita un mongoId válido').isMongoId(),
  check('id').custom(helpersVentas.validarExistaId),
  validarCampos,
], httpVenta.putactualizarVentas); // Ruta para actualizar una venta por su ID

router.put('/listar/:id', [
  check('id', 'Se necesita un mongoId válido').isMongoId(), 
  check('id').custom(helpersVentas.validarExistaId), 
  validarCampos, 
], httpVenta.putListar); // Ruta para listar una venta por su ID
 
export default router;
  
