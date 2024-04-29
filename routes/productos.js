import { Router } from "express";
import httpProducto from "../controllers/productos.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersProductos from "../helpers/productos.js";

const router = Router();

router.get("/", httpProducto.getProducto);
router.get("/producto/:id", httpProducto.getProductoPorId);
router.post(
  "/",
  [
    check("descripcion", "Descripcion no puede estar vacio").notEmpty(),
    check("cantidad", "Id plan no puede estar vacio").notEmpty(),
    check("valor", "valor no puede estar vacio").notEmpty(),
    validarCampos,
  ],
  httpProducto.postcrearProducto
);

router.put(
  "/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersProductos.validarExistaId),
    validarCampos,
  ],
  httpProducto.putactualizarProducto
);
router.put(
  "/:id/activar",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersProductos.validarExistaId),
    validarCampos,
  ],
  httpProducto.putactivarProducto
);

router.put(
  "/:id/inactivar",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersProductos.validarExistaId),
    validarCampos,
  ],
  httpProducto.putinactivarProducto
);

export default router;
