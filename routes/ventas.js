import { Router } from 'express';
import httpVenta from '../controllers/ventas.js';
import { check } from "express-validator";
import helpersClientes from '../helpers/clientes.js';
import helpersProductos from '../helpers/productos.js';
import helpersSedes from '../helpers/sedes.js';
import helpersVentas from '../helpers/ventas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


import Venta from '../models/ventas.js';

const router = Router();

router.get('/', httpVenta.getVentas1); 
router.get('/', httpVenta.getVentas); 
router.get('/:id', httpVenta.getVentasId);
router.get('/:id', httpVenta.getlistarVentasEntreFechas);



router.post('/',
[
    check("idcliente", "Id cliente no puede estar vacio").notEmpty(),
    check("idcliente", "Id se requiere un mongoId valido").isMongoId(),
    check("idproducto", "Id producto no puede estar vacio").notEmpty(),
    check("idproducto", "Id se requiere un mongoId valido").isMongoId(),
    check("idsede", "Id sede no puede estar vacio").notEmpty(),
    check("idsede", "Id se requiere un mongoId valido").isMongoId(),
     
    check("cantidad", "Cantidadno puede estar vacio").notEmpty(),
    
    check("idcliente").custom(helpersClientes.validarExistaId),
    check("idsede").custom(helpersSedes.validarExistaId),
    check("idproducto").custom(helpersProductos.validarExistaId),
    validarCampos,
  ],

 httpVenta.postVentas); 

router.put('/:id', 
[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersVentas.validarExistaId),
    validarCampos,
  ],
httpVenta.putVentas);
 
router.put('/listar',
[
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersVentas.validarExistaId),
    validarCampos,
  ],

httpVenta.putListar);


export default router;
