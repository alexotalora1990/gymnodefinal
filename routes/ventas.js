// import { Router } from 'express';
// import httpVenta from '../controllers/ventas.js'; 
// import { check } from "express-validator";
// import helpersClientes from '../helpers/clientes.js';
// import helpersProductos from '../helpers/productos.js';
// import helpersSedes from '../helpers/sedes.js';
// import helpersVentas from '../helpers/ventas.js';
// import { validarCampos } from '../middlewares/validar-campos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';


// import Venta from '../models/ventas.js';

// const router = Router();

// router.get('/', httpVenta.getVentas); 
// /* router.get('/', httpVenta.getVentas); */ 
// router.get('/:id', httpVenta.getVentasId);
// router.get('/entreFechas', httpVenta.getlistarVentasEntreFechas);

// router.get('/porFecha', httpVenta.getVentasPorFecha); 

// router.post('/',
// [
//     check("idcliente", "Id cliente no puede estar vacio").notEmpty(),
//     check("idcliente", "Id se requiere un mongoId valido").isMongoId(),
//     check("idproducto", "Id producto no puede estar vacio").notEmpty(),
//     check("idproducto", "Id se requiere un mongoId valido").isMongoId(),
//     check("idsede", "Id sede no puede estar vacio").notEmpty(),
//     check("idsede", "Id se requiere un mongoId valido").isMongoId(),
     
//     check("cantidad", "Cantidadno puede estar vacio").notEmpty(),
    
//     check("idcliente").custom(helpersClientes.validarExistaId),
//     check("idsede").custom(helpersSedes.validarExistaId),
//     check("idproducto").custom(helpersProductos.validarExistaId),
//     validarCampos,
//   ],

//  httpVenta.postVentas); 

// router.put('/:id', 
// [
//     check("id", "Se necesita un mongoid valido").isMongoId(),
//     check("id").custom(helpersVentas.validarExistaId),
//     validarCampos,
//   ],
// httpVenta.putactualizarVentas);
 
// router.put('/listar',
// [
//     check("id", "Se necesita un mongoid valido").isMongoId(),
//     check("id").custom(helpersVentas.validarExistaId),
//     validarCampos,
//   ],

// httpVenta.putListar);


// export default router;


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

router.get('/entreFechas', httpVenta.getlistarVentasEntreFechas); // Ruta para obtener ventas entre fechas

router.get('/porFecha', httpVenta.getVentasPorFecha); // Ruta para obtener ventas por fecha

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

