import { Router } from "express";
import httpIngresos from "../controllers/ingresos.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersIngresos from "../helpers/ingresos.js";
import helpersClientes from "../helpers/clientes.js"; 
import helpersSedes from "../helpers/sedes.js";

const router = Router();

router.get("/", httpIngresos.getIngresos);
router.get("ingreso/:id", httpIngresos.getIngresos);

router.post(
  "/",
  [
    check("idcliente", "Id cliente no puede estar vacio").notEmpty(),
    check("idsede", "Id sede no puede estar vacio").notEmpty(),
    check("idcliente", "se requiere un mongoId valido").isMongoId(),
    check("idsede", "se requiere un mongoId valido").isMongoId(),
    check("idcliente").custom(helpersClientes.validarExistaId),
    check("idsede").custom(helpersSedes.validarExistaId),
    validarCampos,
  ],
  httpIngresos.postIngresos
);




router.put(
  "/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersIngresos.validarExistaId),
    validarCampos,
  ],
  httpIngresos.putIngresos
);





router.put(
    "Listar/:id",
    [
      check("id", "Se necesita un mongoid valido").isMongoId(),
      check("id").custom(helpersIngresos.validarExistaId),
      validarCampos,
    ],
    httpIngresos.putListar
  );
 
export default router;
