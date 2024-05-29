import { Router } from "express";
import httpPago from "../controllers/pagos.js";
import { check } from "express-validator";
import helpersClientes from "../helpers/clientes.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersPagos from "../helpers/pagos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get("/", httpPago.getPago);
router.get("/pago/:id", httpPago.getPagoPorId);
router.get("/activos", httpPago.getPagosActivos);
router.get("/inactivos", httpPago.getPagosInactivos);
router.get('/totalPagos', httpPago.getTotalPagos);


router.post(
  "/",
  [
    check("idcliente", "Id cliente no puede estar vacio").notEmpty(),
    check("idcliente", "Id se requiere un mongoId valido").isMongoId(),
    check("idplan", "Id plan no puede estar vacio").notEmpty(),
    check("idplan", "Id se requiere un mongoId valido").isMongoId(),
    check("idcliente").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  httpPago.postcrearPago
);
router.put(
  "/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersPagos.validarExistaId),
    validarCampos,
  ],
  httpPago.putactualizarPago
);

router.put(
  "/activar/:id", 
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersPagos.validarExistaId),
    validarCampos,
  ],
  httpPago.putactivarPago
);
router.put(
  "/inactivar/:id",
  [
    check("id", "Se necesita un mongoid valido").isMongoId(),
    check("id").custom(helpersPagos.validarExistaId),
    validarCampos,
  ],
  httpPago.putinactivarPago
);

export default router;
