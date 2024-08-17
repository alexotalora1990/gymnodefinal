import { Router } from "express";
import httpProducto from "../controllers/productos.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersProductos from "../helpers/productos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/",
[
// validarJWT
],
 httpProducto.getProducto);
router.get("/producto/:id",
[
  validarJWT
  ],
 httpProducto.getProductoPorId);

 router.get("/activos",
 [
  validarJWT
  ],
 httpProducto.getProductosActivos);
router.get("/inactivos",
[
  validarJWT
  ],
httpProducto.getProductosInactivos);


router.post(
  "/",
  [
    // validarJWT,
    check("nombre", "Descripcion no puede estar vacio").notEmpty(),
    check("cantidad", "Id plan no puede estar vacio").notEmpty(),
    check("valor", "valor no puede estar vacio").notEmpty(),
    check("valor", "valor no puede estar vacio").notEmpty(),
    check("vencimiento", "valor no puede estar vacio").notEmpty(),
    check("diasAlerta", "valor no puede estar vacio").notEmpty(), 
    validarCampos,
   
  ],
  httpProducto.postcrearProducto
);

router.put(
  "/:id",
  [
    // validarJWT,
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersProductos.validarExistaId),
    validarCampos,
   
  ],
  httpProducto.putactualizarProducto
);
router.put(
  '/activar/:id',
  [
    // validarJWT,
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersProductos.validarExistaId),
    validarCampos,
    
  ],
  httpProducto.putActivarProducto
);

router.put(
  '/desactivar/:id',
  [
    // validarJWT,
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersProductos.validarExistaId),
    validarCampos,
    
  ],
  httpProducto.putDesactivarProducto
);

export default router;
